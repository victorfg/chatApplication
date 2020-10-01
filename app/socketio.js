const io = require('socket.io').listen(server);

io.on('connection',function(socket) {
    console.log('User connected!');
    socket.on('message', (data) => {
        io.emit('message', data);
    });
    //socket.emit('message',[{author:123,text:'teasd'}])
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});