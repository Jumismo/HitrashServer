var mongoose = require('mongoose');
Schema = mongoose.Schema;

var groupSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: false
    },
    isCleaningGroup: {
        type: Boolean,
        required: true
    },
    hikingTrail: {
        type: Schema.Types.ObjectId, ref: 'HikingTrail',
        required: true
    },
    comments:
        [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ],
    users:
    [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]



});

var Group = module.exports = mongoose.model('Group', groupSchema);
module.exports.get = function (callback, limit) {
    Group.find(callback).limit(limit);
};
