const mongoose = require('mongoose');
const { Schema } = mongoose;

const RoomSchema = new Schema({
    nombreDeLaSala: {
        type: String,
        required: true
    },
    user : {type: Schema.Types.ObjectId, ref: 'User' ,required: true},
    isPublicRoom: {
        type:Boolean,
        required:true
    },
    activated: {
        type: Boolean,
        default: true
    },
});

module.exports = mongoose.model('Room', RoomSchema);