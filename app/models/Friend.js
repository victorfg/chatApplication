const mongoose = require('mongoose');
const { Schema } = mongoose;

const schemaOptions = {
    timestamps: { createdAt: 'created_at'},
};

const FriendSchema = new Schema({
    user : {type: Schema.Types.ObjectId, ref: 'User' ,required: true},
    friend : {type: Schema.Types.ObjectId, ref: 'User' ,required: true},
}, schemaOptions);

module.exports = mongoose.model('Friend', FriendSchema);