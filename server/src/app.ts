import WebSoc from 'ws'
import express from 'express'
import config from 'config'

const server = new WebSoc.Server({ port: 8000 })
const businessServer = new WebSoc.Server({ port: 8001 })

export const clients = new Set()
export const businessClients = new Set()

const app = express()
const PORT: number = config.get('port') || 5005

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/order', require('./routes/orders.routes'))

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

export const businessClients_ = businessClients

const start = async () => {
  try {
    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}...`),
    )
  } catch (e) {
    console.log('server error: ', e)
  }
}

start()
