const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');

//Initializations
const app = express();

//MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Import Routes
app.use(require('./routes/gets'));
app.use(require('./routes/posts'));
app.use(require('./routes/gets'));
app.use(require('./routes/posts'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'images')));

//End MIDDLEWARES

//Settings
app.engine('.hbs', exphbs({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));

//Environment variables
require('dotenv').config();

//Db Connection Start
try {
    mongoose.connect('mongodb+srv://admin:12345@cluster0.vjjlf.mongodb.net/ChatApp?retryWrites=true&w=majority', { useNewUrlParser: true,useUnifiedTopology: true });
    console.log("conected BD!")
} catch (error) {
    handleError(error);
}

app.set('view engine', '.hbs');

server = app.listen(process.env.SERVER_PORT, () => {
    console.log('SERVER STARTED AT', process.env.SERVER_PORT)
});

const io = require('socket.io').listen(server);

io.on('connection',function(socket) {
    console.log('Alguien se ha conectado al servidor de sockets');
    socket.emit('messages',{
        id:1,
        text:'hola soy un mensaje',
        'author':'test'
    });
});