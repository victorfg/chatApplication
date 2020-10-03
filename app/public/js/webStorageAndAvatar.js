//AVATAR
function setImageFromFile(file) {
    var reader = new FileReader();

    reader.onload = function (e) {
        document.getElementById('avatarImg').src = e.target.result;
        saveImageToLocalStorage(e.target.result);
    }

    reader.readAsDataURL(file);
}

function readURL(input) {
    document.getElementById("avatarImg").style.display = "block";

    if (input.files && input.files[0]) {
        setImageFromFile(input.files[0]);
    }
}

function dropHandler(ev) {

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (var i = 0; i < ev.dataTransfer.items.length; i++) {
            // If dropped items aren't files, reject them
            if (ev.dataTransfer.items[i].kind === 'file') {
                var file = ev.dataTransfer.items[i].getAsFile();

                setImageFromFile(file);
            }
        }
    }
}

function dragOverHandler(ev) {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
}

function saveImageToLocalStorage(codeBase64) {
    localStorage.setItem("avatar", codeBase64);
}

//EMAIL

$(document).ready(function () {
    $('.stored').keyup(function () {
        localStorage.setItem('user-name', $(this).val());
    });
    function init() {
        if (localStorage.getItem('user-name')) {
            $('#nombreUsuario').text(localStorage.getItem('user-name'));
        } 
        if (document.getElementById('avatarImgSalaChat') && localStorage.getItem('avatar')){
            var dataImage = localStorage.getItem('avatar');
            if (dataImage) {
                document.getElementById('avatarImgSalaChat').src = dataImage;
            }
        }
    }
    init();
});