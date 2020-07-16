const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
        isWoman:Boolean,
        dateBirth: Date
    }
);

module.exports = mongoose.model('Users', UsersSchema);