const mongoose = require("mongoose");

//Environment variables
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
.then(db => console.log('DB is connected'))
.catch(err => console.log(err));
