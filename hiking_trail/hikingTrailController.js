
HikingTrail = require('./hikingTrailModel');

exports.index = function (req, res) {
    HikingTrail.get(function (err, hikingTrails) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Hiking Trails retrieved successfully",
            data: hikingTrails
        });
    });
};

exports.new = function (req, res) {
    console.log("Params " +  require('util').inspect( req ) );
    console.log("Body " +  require('util').inspect( req.body ) );
    console.log("Files " + req.files);
    var hikingTrail = new HikingTrail();
    hikingTrail.name = req.body.name;
    hikingTrail.distance = req.body.distance;
    hikingTrail.guide = req.body.guide;
    hikingTrail.hardness = req.body.hardness;
    hikingTrail.claims = 0;
    hikingTrail.informationOffice = req.body.informationOffice;
    hikingTrail.isActive = req.body.isActive ? req.body.isActive : false;
    hikingTrail.province = req.body.province;
    hikingTrail.signalize = req.body.signalize;
    hikingTrail.location = req.body.location;
    if(req.body.id_user)
    {
        hikingTrail.user = req.body.id_user;
    }

    if(req.body.groups) {
        for (var k = 0; k < req.body.groups.length; k++) {
            hikingTrail.groups.push(req.body.groups[k]);
        }
    }

    if(req.body.images)
    {
        for(var j = 0; j < req.body.images.length; j++){
            hikingTrail.images.push(req.body.images[j]);
        }
    }
    console.log(hikingTrail);
    hikingTrail.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            message: 'New user created!',
            data: hikingTrail
        });
    });
};

exports.view = function (req, res) {
    HikingTrail.findById(req.params.hiking_trail_id, function (err, hikingTrail) {
        if (err)
            res.send(err);
        res.json({
            message: 'Hiking Trail details loading..',
            data: hikingTrail
        });
    });
};

exports.delete = function (req, res) {
    HikingTrail.remove({
        _id: req.params.hiking_trail_id
    }, function (err, hikingTrail) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Hiking Trail deleted'
        });
    });
};

exports.update = function (req, res) {

    HikingTrail.findById(req.params.hiking_trail_id, function (err, hikingTrail) {
        if (err)
            res.send(err);
        hikingTrail.name = req.body.name ? req.body.name : hikingTrail.name;
        hikingTrail.distance = req.body.distance ? req.body.distance : hikingTrail.distance;
        hikingTrail.claims = req.body.claims ? req.body.claims : hikingTrail.claims;
        hikingTrail.guide = req.body.guide ? req.body.guide : hikingTrail.guide;
        hikingTrail.hardness = req.body.hardness ? req.body.hardness : hikingTrail.hardness;
        hikingTrail.informationOffice = req.body.informationOffice ? req.body.informationOffice : hikingTrail.informationOffice;
        hikingTrail.isActive = req.body.isActive ? req.body.isActive : hikingTrail.isActive;
        hikingTrail.province = req.body.province ? req.body.province : hikingTrail.province;
        hikingTrail.signalize = req.body.signalize ? req.body.signalize : hikingTrail.signalize;
        hikingTrail.location = req.body.location? req.body.location : hikingTrail.location;
        if(req.body.user) {
            hikingTrail.user = req.body.user._id ? req.body.user._id : hikingTrail.user;
        }

        hikingTrail.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Hiking Trail Info updated',
                data: hikingTrail
            });
        });
    });
};

// Cleaning Claims
exports.cleaningClaims = function (req, res) {
    HikingTrail.find().where('claims').gte(100).exec(function (err, hikingTrail) {
        if (err)
            res.send(err);
        res.json({
            message: 'Hiking Trail details loading..',
            data: hikingTrail
        });
    });
};

exports.activeHikingTrails = function (req, res) {
    HikingTrail.find().where('isActive', true).exec(function (err, hikingTrails) {
        if(err)
            res.send(err);
        res.json({
            message: "Hiking Trails loading...",
            data: hikingTrails
        })
    })
};

