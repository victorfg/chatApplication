const io = require('socket.io').listen(server);

io.on('connection',function(socket) {
    console.log('Alguien se ha conectado al servidor de sockets');
    socket.emit('messages',{
        id:1,
        text:'hola soy un mensaje',
        'author':'test'
    });
});