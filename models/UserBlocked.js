const mongoose = require('mongoose');

const UserFriendSchema = mongoose.Schema(
    {
        id: {
            type: 'integer',
            required: true
        },
        user_id: {
            type: 'integer',
            required: true
        },
        blocked_user_id: {
            type: 'integer',
            required: true
        },
        deleted_at: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
    });

module.exports = mongoose.model('Users', UserFriendSchema);