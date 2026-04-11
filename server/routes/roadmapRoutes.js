const express = require('express');
const router = express.Router();
const roadmapController = require('../controllers/roadmapController');
const auth = require('../middleware/authMiddleware');

// @route   GET api/roadmap
// @desc    Get user's customized roadmap
// @access  Private
router.get('/', auth, roadmapController.getRoadmap);

// @route   PUT api/roadmap/task/:milestoneId/:taskId
// @desc    Toggle task completion status
// @access  Private
router.put('/task/:milestoneId/:taskId', auth, roadmapController.updateTaskStatus);

module.exports = router;
