ImageModel = require('./imageModel');

exports.new = function (req, res) {
    console.log(require('util').inspect(req.body));
    var image = new ImageModel();
    image.image = req.files;

    image.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            message: 'New user created!',
            data: image
        });
    });
};
