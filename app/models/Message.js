const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema({
    room : {type: Schema.Types.ObjectId, ref: 'Room' ,required: true},
    user : {type: Schema.Types.ObjectId, ref: 'User' ,required: true},
    text: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
});

module.exports = mongoose.model('Message', MessageSchema);