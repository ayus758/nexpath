const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');
const auth = require('../middleware/authMiddleware');

// @route   GET api/resources
// @desc    Get aggregated resources
// @access  Private
router.get('/', auth, resourceController.getResources);

module.exports = router;
