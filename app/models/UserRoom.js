const mongoose = require('mongoose');
const { Schema } = mongoose;

const schemaOptions = {
    timestamps: { createdAt: 'created_at'},
};

const UserRoomSchema = new Schema({
    user : {type: Schema.Types.ObjectId, ref: 'User' ,required: true},
    room : {type: Schema.Types.ObjectId, ref: 'Room' ,required: true},
    in_room: {
        type: Boolean,
        required: true
    },
}, schemaOptions);

module.exports = mongoose.model('UserRoom', UserRoomSchema);