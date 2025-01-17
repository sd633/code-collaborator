// Backend: Node.js + Express + Socket.IO
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', 
    methods: ['GET', 'POST']
  }
});


app.use(cors());
app.use(express.json());


let codeData = '';

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  
  socket.emit('load-code', codeData);

  
  socket.on('code-change', (newCode) => {
    codeData = newCode; 
    socket.broadcast.emit('code-change', newCode);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});