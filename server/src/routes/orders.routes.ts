import { Router, Application, Request, Response, NextFunction } from 'express'
import WebSoc from 'ws'
import { businessClients, clients } from '../app'

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
    const message = {
      ...req.body,
      data: { ...req.body.data, id },
    }
    id++
    const stringMessage = JSON.stringify(message)
    businessClients.forEach((client: any) => {
      if (client.readyState === WebSoc.OPEN) client.send(stringMessage)
    })

    res.status(200).json(`order delivered`)
  } catch (e) {
    console.log('Hook Error', e.message)
  }
})

router.post('/accept', async (req, res) => {
  try {

    console.log('req: ', req.body);
    

    clients.forEach((client: any) => {
      if (client.readyState === WebSoc.OPEN) {
        client.send('Status')
      }
    })

    // const message = {
    //   ...req.body,
    //   data: { ...req.body.data, id },
    // }
    // id++
    // const stringMessage = JSON.stringify(message)
    // businessClients.forEach((client: any) => {
    //   if (client.readyState === WebSoc.OPEN) client.send(stringMessage)
    // })

    res.status(200).json(`order accepted`)
  } catch (e) {
    console.log('Hook Error', e.message)
  }
})

module.exports = router
