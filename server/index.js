const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const config = require('./config');
const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Db Connection Start
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URL, { useNewPassword: true, password: process.env.MONGODB_PASSWORD, useNewUrlParser: true })
    .then(() => console.log('connection succesful'))
    .catch((err) => console.error(err));
//Db Connetion End

io.on('connection', (socket) => {
    console.log('socketIO tenemos nueva conexion!!');

    socket.on('disconnect', () => {
        console.log('el usuario se ha ido!!')
    })
})

app.use(router);

server.listen(process.env.SERVER_PORT);