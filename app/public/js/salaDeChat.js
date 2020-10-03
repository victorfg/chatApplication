var socket = io.connect('http://localhost:5000',{
    'forceNew':true
});

socket.on('message', function(data) {
    data.forEach(function(message,key,data){
        $("#messages").append('<li><b>'+message.author+'</b>: '+message.text+'</li>');
    });
})

function sendMessage(e) {
    if($("#chat-text").val().length==0){
        console.log('no hay texto, no enviamos');
        return false;
    }
    var message = [
        {
            text: $("#chat-text").val(),
            author: localStorage.getItem("email"),
        }
    ];
    console.log('enviamos->');
    console.log(message);
    socket.emit('message', message)
    return false;
}