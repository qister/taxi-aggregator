import { Router, Application, Request, Response, NextFunction } from 'express'

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

router.post('/new', async (req, res) => {
  try {
    console.log('Request: ', req.body)
    res.status(200).json(`order accepted`)
  } catch (e) {
    console.log('Hook Error', e.message)
  }
})

module.exports = router
