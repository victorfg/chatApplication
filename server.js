const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require("passport");
const session = require("express-session");
const cors = require('cors');
const flash = require('connect-flash');

//Initializations
const app = express();
require('./database');
require('./lib/passport');

//MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'mysecretapp',
    resave:true,
    saveUnitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

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