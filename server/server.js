const WebSocket = require('ws')

const server = new WebSocket.Server({ port: 8000 })
const businessServer = new WebSocket.Server({ port: 8001 })

const clients = new Set()
const businessClients = new Set()

server.on('connection', (ws, request, client) => {
  // console.log(ws);
  // console.log(request)
  clients.add(ws)
  ws.on('message', (message) => {
    if (message === 'exit') {
      ws.close()
    } else {
      businessClients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) client.send(message)
      })

      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) client.send(message)
      })
    }
  })
  ws.send('Hello', null, () => console.log('Client connected'))
})

businessServer.on('connection', (ws, request, client) => {
  businessClients.add(ws)
  ws.on('message', (message) => {
    if (message === 'exit') {
      ws.close()
    } else {
      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          console.log(message)
          client.send(message)
        }
      })
    }
  })
  ws.send('Hello', null, () => console.log('Business Client connected'))
})
