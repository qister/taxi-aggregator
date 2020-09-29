import WebSoc from 'ws'
import express from 'express'
import config from 'config'
import mongoose from 'mongoose'

const server = new WebSoc.Server({ port: 8000 })
const businessServer = new WebSoc.Server({ port: 8001 })

export const clients = new Set()
export const businessClients = new Set()

server.on('connection', (ws) => {
  clients.add(ws)
  let id = 1
  ws.on('message', (message) => {
    if (typeof message === 'string') {
      const parsedMessage = JSON.parse(message)
      const newMessage = {
        ...parsedMessage,
        data: { ...parsedMessage.data, id },
      }
      id++
      console.log(newMessage)
      const nextMessage = JSON.stringify(newMessage)
      businessClients.forEach((client: any) => {
        if (client.readyState === WebSoc.OPEN) client.send(nextMessage)
      })
    }
  })
  ws.send('Hello', {}, () => console.log('Client connected'))
})

businessServer.on('connection', (ws) => {
  businessClients.add(ws)
  ws.on('message', (message) => {
    clients.forEach((client: any) => {
      if (client.readyState === WebSoc.OPEN) {
        client.send(message)
      }
    })
  })
  ws.send('Hello', {}, () => console.log('Business Client connected'))
})

interface IOrder {
  id: number
  user: string
  status: 'pending' | 'accepted' | 'finished' | 'rejected'
}

const app = express()
const PORT: number = config.get('port') || 5005
const URI: string = config.get('mongoUri')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/order', require('./routes/orders.routes'))

const start = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    console.log('монга подключена ', new Date().toLocaleDateString())

    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}...`),
    )
  } catch (e) {
    console.log('server error: ', e)
    process.exit(1)
  }
}

start()
