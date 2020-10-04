const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    nameInput: {
        type: String,
        required: true
    },
    emailInput: {
        type: String,
        required: true
    },
    passwordInput: {
        type: String,
        required: true
    },
    date: {
        type:Date,
        default:Date.now
    },
    image:String,
    subscribing : [{type: Schema.Types.ObjectId, ref: 'Message' }],
});

module.exports = mongoose.model('User', UserSchema);