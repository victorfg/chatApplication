const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
        isWoman: Boolean,
        dateBirth: Date,
        deleted_at: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
    });


module.exports = mongoose.model('Users', UsersSchema);