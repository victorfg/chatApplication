const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket)=> {
    console.log('socketIO tenemos nueva conexion!!');

    socket.on ('disconnect', () => {
        console.log('el usuario se ha ido!!')
    })
})

app.use(router);

server.listen(PORT);