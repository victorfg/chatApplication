const mongoose = require('mongoose');
const { Schema } = mongoose;

// const schemaOptions = {
//     timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
// };

const MessageSchema = new Schema({
    // idRoom: {
    //     type: String,
    //     required: true
    // },
    // idUser: {
    //     type: String,
    //     required: true
    // },
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
// }, schemaOptions);

module.exports = mongoose.model('Message', MessageSchema);