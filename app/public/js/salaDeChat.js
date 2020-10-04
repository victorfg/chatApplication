var socket = io.connect('http://localhost:5000',{
    'forceNew':true
});

socket.on('message', function(message) {
    idRoom = document.getElementById('room-name').dataset.roomid;
    date = Date.now() / 1000;

    if(idRoom != message.idRoom){
        return;
    }
    $.post( "/saveMessage",message,null);


    $("#messages").append('<li><small>'+ date +'</small><b>'+message.author+'</b>: '+message.text+'</li>');
})

function sendMessage(e) {
    if($("#chat-text").val().length==0){
        console.log('no hay texto, no enviamos');
        return false;
    }
    var message =
        {
            text: $("#chat-text").val(),
            author: localStorage.getItem("user-name"),
            idUser: localStorage.getItem("user-id"),
            idRoom: document.getElementById('room-name').dataset.roomid,
        }
    ;
    console.log('enviamos->');
    console.log(message);
    socket.emit('message', message);

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