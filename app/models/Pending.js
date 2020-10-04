const mongoose = require('mongoose');
const { Schema } = mongoose;

const schemaOptions = {
    timestamps: { createdAt: 'created_at'},
};

const PendingSchema = new Schema({
    from_user : {type: Schema.Types.ObjectId, ref: 'User' ,required: true},
    to_user : {type: Schema.Types.ObjectId, ref: 'User' ,required: true},
    status: {
        type: String,
        required: true
    },
}, schemaOptions);

module.exports = mongoose.model('Pending', PendingSchema);