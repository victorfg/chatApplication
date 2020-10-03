const mongoose = require('mongoose');
const { Schema } = mongoose;

const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};

const MessageSchema = new Schema({
    idRoom: {
        type: String,
        required: true
    },
    idUser: {
        type: String,
        required: true
    },
    text: {
        type:String,
        required:true
    }
}, schemaOptions);

module.exports = mongoose.model('Message', MessageSchema);