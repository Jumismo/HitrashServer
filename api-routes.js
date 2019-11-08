// api-routes.js
// Initialize express router
var options = {
     setHeaders: function (res, path, stat) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    }
};

let router = require('express').Router([options]);


// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to API Hitrash!',
    });
});
// Import controllers
var userController = require('./user/userController');
// User routes
router.route('/users')
    .get(userController.index)
    .post(userController.new);
router.route('/users/:user_id')
    .get(userController.view)
    .patch(userController.update)
    .put(userController.update)
    .delete(userController.delete);
router.route('/authentication')
    .post(userController.authentication);
router.route('/activeUsers')
    .get(userController.activeUsers);

// Import hiking trail controller
var hikingTrailController = require('./hiking_trail/hikingTrailController');

router.route('/hikingTrail')
    .get(hikingTrailController.index)
    .post(hikingTrailController.new);
router.route('/hikingTrail/:hiking_trail_id')
    .get(hikingTrailController.view)
    .patch(hikingTrailController.update)
    .put(hikingTrailController.update)
    .delete(hikingTrailController.delete);
router.route('/activeHikingTrails')
    .get(hikingTrailController.activeHikingTrails);

// Method for Claims
router.route('/cleaningClaims')
    .get(hikingTrailController.cleaningClaims);

// Import comment controller
var commentController = require('./comment/commentController');

router.route('/comment')
    .post(commentController.new);
router.route('/comment/:comment_id')
    .get(commentController.view)
    .put(commentController.update)
    .patch(commentController.update)
    .delete(commentController.delete);

// Import group controller
var groupController = require('./group/groupController');

router.route('/group')
    .post(groupController.new);
router.route('/group/:group_id')
    .get(groupController.view)
    .patch(groupController.update)
    .put(groupController.update);
router.route('/userGroup')
    .get(groupController.userGroup);
router.route('/cleaningGroup')
    .get(groupController.cleaningGroup);

var imageController = require('./image/imageController');
router.route('/image')
    .post(imageController.new);

// Export API routes
module.exports = router;
