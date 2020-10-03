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

    //scroll al ultimo mensaje y seteamos el input value del mensaje
    var height = 0;
    $('#messages li').each(function(i, value){
        height += parseInt($(this).height());
    });

    height += '';

    $('.text-area-chat').animate({scrollTop: height});
    $('#chat-text').val("");

    return false;
}