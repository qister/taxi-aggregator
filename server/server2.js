const webSocketsServerPort = 8003
const webSocketServer = require('websocket').server
const http = require('http')
//__________
const WebSocket = require('ws')

const server2 = new WebSocket.Server({ port: 8002 })

const clients = {}

// This code generates unique userid for everyuser.
const getUniqueID = () => {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  return s4() + s4() + '-' + s4()
}

server2.on('request', (request) => {
  console.log(request);
  const userID = getUniqueID()

  const connection = request.accept(null, request.origin)
  clients[userID] = connection

  connection.on('message', function (message) {
    console.log(message);
    if (message.type === 'utf8') {
      // console.log('Received Message: ', message.utf8Data);

      // broadcasting message to all connected clients
      for (key in clients) {
        clients[key].sendUTF(message.utf8Data)
        console.log('sent Message to: ', clients[key])
      }
    }
  })
})

// wsServer.on('request', function (request) {
//   var userID = getUniqueID()
//   // console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');

//   // You can rewrite this part of the code to accept only the requests from allowed origin
//   const connection = request.accept(null, request.origin)
//   clients[userID] = connection
//   // console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));

//   connection.on('message', function (message) {
//     if (message.type === 'utf8') {
//       // console.log('Received Message: ', message.utf8Data);

//       // broadcasting message to all connected clients
//       for (key in clients) {
//         clients[key].sendUTF(message.utf8Data)
//         console.log('sent Message to: ', clients[key])
//       }
//     }
//   })
// })

// Spinning the http server and the websocket server.
// const server = http.createServer();
// server.listen(webSocketsServerPort);
// console.log('listening on port 8003');

// const wsServer = new webSocketServer({
//   httpServer: server
// });
