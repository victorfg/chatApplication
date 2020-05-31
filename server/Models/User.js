var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myuser = new Schema(
    { 
        name:String,
        email:String,
        password:String,         
    }
);

module.exports = mongoose.model('users',myuser);