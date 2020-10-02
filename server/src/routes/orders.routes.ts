import { Router, Application, Request, Response, NextFunction } from 'express'
import WebSoc from 'ws'
import { businessClients, clients } from '../app'
const Order = require('../models/Order')

const router = Router()

// router.get('/show', async (req: Request, res: Response) => {
//   try {
//     const meme = await Meme.find({ id: req.query.id })
//     res.status(200).json(meme)
//   } catch (e) {
//     console.log('Error: ', e.message)
//   }
// })

// router.get('/getlist', async (req: Request, res: Response) => {
//   try {
//     const allMemes: [] = await Meme.find({})

//     res.status(200).json(allMemes)
//   } catch (e) {
//     console.log('Error', e.message)
//   }
// })

let id = 1

router.post('/new', async (req, res) => {
  try {
    console.log('req.body: ', req.body)

    const message = {
      ...req.body,
      data: { ...req.body.data, id },
    }

    const stringMessage = JSON.stringify(message)

    // currentOrders.push({
    //   id: id,
    //   user: req.body.username,
    //   status: 'pending'
    // })

    const newOrder = new Order({
      id,
      ...req.body.data,
      status: 'pending',
      acceptedBy: '',
    })

    await newOrder.save()

    businessClients.forEach((client: any) => {
      if (client.readyState === WebSoc.OPEN) client.send(stringMessage)
    })
    id++

    res.status(200).json(`order delivered`)
  } catch (e) {
    console.log('Hook Error', e.message)
  }
})

router.post('/accept', async (req, res) => {
  try {
    // console.log('req: ', req.body.id)
    const { id, user } = req.body
    console.log('user, id', user, id)

    await Order.updateOne(
      { id: id },
      {
        status: 'accepted',
        acceptedBy: user,
      },
    )

    clients.forEach((client: any) => {
      if (client.readyState === WebSoc.OPEN) client.send('accepted')
    })

    res.status(200).json(`order accepted`)
  } catch (e) {
    console.log('Hook Error', e.message)
  }
})

router.post('/complete', async (req, res) => {
  try {
    // console.log('req: ', req.body.id)
    const { id, user } = req.body
    console.log('user, id to complete', user, id)

    await Order.updateOne(
      { id: id },
      {
        status: 'completed',
        completedBy: user,
      },
    )

    res.status(200).json(`order completed`)
  } catch (e) {
    console.log('Hook Error', e.message)
  }
})

router.post('/user-decline', async (req, res) => {
  try {
    console.log('req body: ', req.body)
    const { user } = req.body.data

    const order = await Order.findOne({user, status: 'pending'})

    console.log('Order: ',order);
    

    const message = {
      ...req.body,
      data: { ...req.body.data, id: order.id },
    }

    const stringMessage = JSON.stringify(message)

    console.log('stringMessage: ', stringMessage);
    

    businessClients.forEach((client: any) => {
      if (client.readyState === WebSoc.OPEN) client.send(stringMessage)
    })

    await Order.updateOne({user, id: order.id}, {
      status: 'declined by user',
    })

    // console.log('user to decline', user )

    // await Order.updateOne(
    //   { user, status: 'pending' },
    //   {
    //     status: 'rejected by user',
    //     completedBy: user,
    //   },
    // )

    // const newOrder = new Order({
    //   id,
    //   ...req.body.data,
    //   status: 'pending',
    //   acceptedBy: '',
    // })

    // await newOrder.save()

    // businessClients.forEach((client: any) => {
    //   if (client.readyState === WebSoc.OPEN) client.send(stringMessage)
    // })
    // id++

    res.status(200).json(`order declined succesfully`)
  } catch (e) {
    console.log('Hook Error', e.message)
  }
})

module.exports = router
