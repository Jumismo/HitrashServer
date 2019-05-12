// UserModel.js
var mongoose = require('mongoose');
Schema = mongoose.Schema;
// Setup schema
var userSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: false
    },
    hikingTrails:
    [
        {
            type: Schema.Types.ObjectId,
            ref: 'HikingTrail'
        }
    ],
    comments:
        [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ],
    groups:
    [
        {
            type: Schema.Types.ObjectId,
            ref: 'Group'
        }
    ]

});
// Export User model
var User = module.exports = mongoose.model('User', userSchema);
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
};
