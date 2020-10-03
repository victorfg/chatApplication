const mongoose = require('mongoose');
const { Schema } = mongoose;

const RoomSchema = new Schema({
    nombreDeLaSala: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    isPublicRoom: {
        type:Boolean,
        required:true
    }
});

module.exports = mongoose.model('Room', RoomSchema);