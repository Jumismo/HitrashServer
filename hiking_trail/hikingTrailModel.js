var mongoose = require('mongoose');
Schema = mongoose.Schema;
var hikingTrailSchema = mongoose.Schema({
    distance: {
        type: Number,
        required: true
    },
    claims: {
        type: Number,
        required: true,
        default: 0
    },
    guide: {
        type: Boolean,
        required: true,
        default: false
    },
    hardness: {
        type: String,
        required: true,
        default: "Easy"
    },
    informationOffice: {
        type: Boolean,
        required: true,
        default: false
    },
    isActive: {
        type: Boolean,
        required: true,
        default: false
    },
    location: {
        type: String,
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    signalize: {
        type: Boolean,
        required: true,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    images:
        [
            {
                type: Buffer
                // type: Buffer,
                // contentType: String
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

var HikingTrail = module.exports = mongoose.model('HikingTrail', hikingTrailSchema);
module.exports.get = function (callback, limit) {
    HikingTrail.find(callback).limit(limit);
};
