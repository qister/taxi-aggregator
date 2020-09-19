import WebSoc from 'ws'

const server = new WebSoc.Server({ port: 8000 })
const businessServer = new WebSoc.Server({ port: 8001 })

const clients = new Set()
const businessClients = new Set()

server.on('connection', (ws: any) => {
  clients.add(ws)
  let id = 1
  ws.on('message', (message: any) => {
    if (message === 'exit') {
      ws.close() 
    } else {
      const parsedMessage = JSON.parse(message)
      const newMessage = {...parsedMessage, data: {...parsedMessage.data, id}}
      id++
      console.log(newMessage)
      const nextMessage = JSON.stringify(newMessage)
      businessClients.forEach((client: any) => {
        if (client.readyState === WebSoc.OPEN) client.send(nextMessage)
      })
    }
  })
  ws.send('Hello', null, () => console.log('Client connected'))
})

businessServer.on('connection', (ws: any) => {
  businessClients.add(ws)
  ws.on('message', (message: any) => {
    if (message === 'exit') {
      ws.close()
    } else {
      clients.forEach((client: any) => {
        if (client.readyState === WebSoc.OPEN) {
          console.log(message)
          client.send(message)
        }
      })
    }
  })
  ws.send('Hello', null, () => console.log('Business Client connected'))
})
