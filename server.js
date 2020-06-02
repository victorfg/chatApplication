const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

//Initializations
const app = express();

//Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/listaDeSalas.routes'));

//Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'images')));

//Settings
app.engine('.hbs', exphbs({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));

//Environment variables
require('dotenv').config();

/*const mongoose = require('mongoose');
var Schema = mongoose.Schema;*/

//Db Connection Start
/*mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URL, { useNewPassword: true, password: process.env.MONGODB_PASSWORD, useNewUrlParser: true })
    .then(() => console.log('connection succesful'))
    .catch((err) => console.error(err));*/
//Db Connetion End

app.set('view engine', '.hbs');

app.listen(process.env.SERVER_PORT, () => {
    console.log('SERVER STARTED AT', process.env.SERVER_PORT)
})