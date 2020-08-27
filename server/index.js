const webSocketServerPort = 8000
const webSockerServer = require('websocket').server
const http = require('http')

const server  = http.createServer()
server.listen(webSocketServerPort)
console.log(`listening on port ${webSocketServerPort}`);