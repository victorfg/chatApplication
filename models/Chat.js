const mongoose = require('mongoose');

const UserFriendSchema = mongoose.Schema(
    {
        id: {
            type: 'integer',
            required: true
        },
        name: {
            type: 'string',
            required: true
        },
        is_public: {
            type: 'boolean',
            required: true
        },
        status: {
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