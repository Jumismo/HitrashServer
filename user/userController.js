// contactController.js
// Import contact model
User = require('./userModel');
// Handle index actions
exports.index = function (req, res) {
    User.get(function (err, users) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Users retrieved successfully",
            data: users
        });
    });
};
// Handle create contact actions
exports.new = function (req, res) {
    var user = new User();
    user.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email;
    user.isAdmin = req.body.isAdmin ? req.body.isAdmin: false;
    user.isActive = req.body.isActive ? req.body.isActive : false;

    if(req.body.hikingTrails) {
        for (var i = 0; i < req.body.hikingTrails.length; i++) {
            user.hikingTrails.push(req.body.hikingTrails[i]);
        }
    }
    if(req.body.comments) {
        for (var j = 0; j < req.body.comments.length; j++) {
            user.comments.push(req.body.comments[j]);
        }
    }

    if(req.body.groups) {
        for (var k = 0; k < req.body.groups.length; k++) {
            user.groups.push(req.body.groups[k]);
        }
    }
// save the contact and check for errors
    user.save(function (err) {
        if (err)
             res.json(err);
        res.json({
            message: 'New user created!',
            data: user
        });
    });
};
// Handle view user info
exports.view = function (req, res) {
    console.log(req.params.user_id);
    User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
        res.json({
            message: 'User details loading..',
            data: user
        });
    });
};
// Handle update user info
exports.update = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
        user.name = req.body.name ? req.body.name : user.name;
        user.password = req.body.password ? req.body.password : user.password;
        user.email = req.body.email ? req.body.email: user.email;
        user.isAdmin = req.body.isAdmin ? req.body.isAdmin : user.isAdmin;
        user.isActive = req.body.isActive ? req.body.isActive : user.isActive;

        if(req.body.hikingTrail) {
            for (var i = 0; i < req.body.hikingTrails.length; i++) {
                user.hikingTrails.push(req.body.hikingTrails[i]);
            }
        }

        if(req.body.comments) {
            for (var j = 0; j < req.body.comments.length; j++) {
                user.comments.push(req.body.comments[j]);
            }
        }

        if(req.body.groups) {
            for (var k = 0; k < req.body.groups.length; k++) {
                user.groups.push(req.body.groups[k]);
            }
        }
// save the contact and check for errors
        user.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'User Info updated',
                data: user
            });
        });
    });
};
// Handle delete user
exports.delete = function (req, res) {
    User.remove({
        _id: req.params.user_id
    }, function (err, user) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'User deleted'
        });
    });
};

exports.authentication = function(req, res) {
    var name = req.body.name ? req.body.name : user.name;
    var password = req.body.password;
    User.findOne({'name': name, 'password': password}).exec(function(err, user){
        if (err)
            return handleError(err);
        res.json({
            message: 'User Logged',
            data: user
        });
    });
};

exports.activeUsers = function(req, res){
    User.find().where('isActive', true).exec(function (err, users) {
       if(err)
           return handleError(err);
       res.json({
           message: 'Users found...',
           data: users
       })
    });
}
