Comment = require('./commentModel');

exports.new = function (req, res) {
    var comment = new Comment();
    comment.comment = req.body.comment;
    comment.publicationDate = req.body.publicationDate? req.body.publicationDate : Date.now();

    if(req.body.id_author) {
        comment.author = req.body.id_author;
    }
    if(req.body.id_group) {
        comment.group = req.body.id_group;
    }

    comment.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            message: 'New comment created!',
            data: comment
        });
    });
};

exports.view = function (req, res) {
    Comment.findById(req.params.comment_id, function (err, comment) {
        if (err)
            res.send(err);
        res.json({
            message: 'Comment details loading..',
            data: comment
        });
    });
};

exports.delete = function (req, res) {
    Comment.remove({
        _id: req.params.comment_id
    }, function (err, comment) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Commnet deleted'
        });
    });
};

exports.update = function (req, res) {
    Comment.findById(req.params.comment_id, function (err, comment) {
        if (err)
            res.send(err);
        comment.comment = req.body.comment ? req.body.comment : comment.comment;
        comment.publicationDate = req.body.publicationDate ? req.body.publicationDate : comment.publicationDate;
        comment.author = req.body.author._id ? req.body.author._id : comment.author;
        comment.group = req.body.grupo._id ? req.body.grupo._id : comment.group;

        comment.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Comment Info updated',
                data: comment
            });
        });
    });
};
