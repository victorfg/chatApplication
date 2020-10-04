const mongoose = require('mongoose');
const { Schema } = mongoose;

const schemaOptions = {
    timestamps: { createdAt: 'created_at'},
};

const PendingSchema = new Schema({
    from-user : {type: Schema.Types.ObjectId, ref: 'User' ,required: true},
    to-user : {type: Schema.Types.ObjectId, ref: 'User' ,required: true},
    state: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
}, schemaOptions);

module.exports = mongoose.model('Pending', PendingSchema);