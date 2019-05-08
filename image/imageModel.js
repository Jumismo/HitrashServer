var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
    image: {
        data: Buffer, contentType: String,
        required: true
    },
    hikingTrail: {
        type: Schema.Types.ObjectId,
        ref: 'HikingTrail'
    }
});

var Image = module.exports = mongoose.model('Image', imageSchema);
module.exports.get = function (callback, limit) {
    Image.find(callback).limit(limit);
};
