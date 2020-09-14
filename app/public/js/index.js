var socket = io.connect('http://localhost:5000',{
    'forceNew':true
});
socket.on('messages', function(data) {
    console.log(data);
})