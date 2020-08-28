const ws = new require('ws');
const http = require('http')
const wss = new ws.Server({port: 8002});

const clients = new Set();

http.createServer((req, res) => {
  // в реальном проекте здесь может также быть код для обработки отличных от websoсket-запросов
  // здесь мы работаем с каждым запросом как с веб-сокетом
  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), function onSocketConnect(ws) {
    clients.add(ws);
  
    ws.on('message', function(message) {
      console.log(message);
      message = message.slice(0, 50); // максимальный размер сообщения 50
  
      for(let client of clients) {
        client.send('lalalalala');
      }
    });
  
    ws.on('close', function() {
      clients.delete(ws);
    });
  });
});

function onSocketConnect(ws) {
  clients.add(ws);

  ws.on('message', function(message) {
    message = message.slice(0, 50); // максимальный размер сообщения 50

    for(let client of clients) {
      client.send('lalalalala');
    }
  });

  ws.on('close', function() {
    clients.delete(ws);
  });
}