var mongoose = require('mongoose');
Schema = mongoose.Schema;

var commentSchema = mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    publicationDate: {
        type: Date,
        default: Date.now
    },
    author: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    group: {
        type: Schema.Types.ObjectId, ref: 'Group',
        required: true
    }
});

var Comment = module.exports = mongoose.model('Comment', commentSchema);
module.exports.get = function (callback, limit) {
    Comment.find(callback).limit(limit);
};
