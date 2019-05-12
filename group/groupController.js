
Group = require('./groupModel');

exports.new = function (req, res) {
  var group = new Group();
  group.name = req.body.name;
  group.description = req.body.description;
  group.date = req.body.date;
  group.location = req.body.location;
  group.isActive  = req.body.isActive? req.body.isActive : true;
  group.isCleaningGroup = req.body.isCleaningGroup;
  group.hikingTrail = req.body.id_hiking_trail;

  if(req.body.comments) {
      for (var i = 0; i < req.body.comments.length; i++) {
          group.comments.push(req.body.comments[i]);
      }
  }

  if(req.body.users) {
      for (var j = 0; j < req.body.users.length; j++) {
          group.users.push(req.body.users[j]);
      }
  }
  group.save(function (err) {
    if (err)
        res.json(err);
    res.json({
        message: 'New group created!',
        data: group
    });
  });
};

exports.view = function (req, res) {
    Group.findById(req.params.group_id).populate('comments').populate('users').populate('hikingTrail').exec( function (err, group) {
        if (err)
            res.send(err);
        res.json({
            message: 'Group details loading..',
            data: group
        });
    });
};

exports.update = function (req, res) {
    Group.findById(req.params.group_id).populate('hikingTrail').populate('comments').populate('users').exec(function (err, group) {
        group.name = req.body.name ? req.body.name : group.name;
        group.description = req.body.description ? req.body.description : group.description;
        group.date = req.body.date ? req.body.date : group.date;
        group.location = req.body.location ? req.body.location : group.location;
        group.isActive  = req.body.isActive ? req.body.isActive : group.isActive;
        group.isCleaningGroup = req.body.isCleaningGroup ? req.body.isCleaningGroup : group.isCleaningGroup;
        if(req.body.hikingTrail) {
            group.hikingTrail = req.body.hikingTrail._id ? req.body.hikingTrail._id : group.hikingTrail;
        }
        if(req.body.comments) {
            for (var i = 0; i < req.body.comments.length; i++) {
                group.comments.push(req.body.comments[i]);
            }
        }
        if(req.body.users) {
            for (var j = 0; j < req.body.users.length; j++) {
                group.users.push(req.body.users[j]);
            }
        }

        group.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'New group created!',
                data: group
            });
        });
    });
};


exports.userGroup = function (req, res) {
    Group.find().populate('hikingTrail').populate('users').populate('comments').where('isCleaningGroup', false).exec(function (err, group) {
        // console.log("Los grupos son: " + group);
        if (err)
            res.send(err);
        res.json({
            message: 'Group details loading..',
            data: group
        });
    })
};

exports.cleaningGroup = function (req, res) {
    Group.find().populate('hikingTrail').populate('users').populate('comments').where('isCleaningGroup', true).exec(function (err, group) {
        // console.log("Los grupos son: " + group);
        if (err)
            res.send(err);
        res.json({
            message: 'Group details loading..',
            data: group
        });
    })
};
