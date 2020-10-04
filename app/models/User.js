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
    created_at: {
        type:Date,
        default:Date.now
    },
    friends : [{type: Schema.Types.ObjectId, ref: 'Friend' ,required: true}],
    image:String,
});

module.exports = mongoose.model('User', UserSchema);