const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require("passport");
const methodOverride = require('method-override');
const session = require("express-session");
const cors = require('cors');
const flash = require('connect-flash');
const morgan = require('morgan');
const connectMongo = require('connect-mongo');
const mongoose = require('mongoose');

//Initializations
const app = express();
require('./lib/passport');

//Settings
app.engine('.hbs', exphbs({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));

app.set('view engine', '.hbs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
const MongoStore = connectMongo(session);
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'secret',
    store: new MongoStore({mongooseConnection: mongoose.connection})
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Routes
app.use(require('./routes/gets'));
app.use(require('./routes/posts'));
app.use(require('./routes/gets'));
app.use(require('./routes/posts'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'images')));

module.exports = app;