const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  type: { 
    type: String, 
    enum: ['Video', 'Article', 'Practice', 'Concept', 'MockTest'],
    default: 'Concept'
  },
  estimatedHours: { type: Number, default: 1 },
  isCompleted: { type: Boolean, default: false }
});

const MilestoneSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ['Pending', 'Active', 'Completed'],
    default: 'Pending'
  },
  tasks: [TaskSchema]
});

const RoadmapSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  targetGoal: { type: String, required: true },
  progressPercentage: { type: Number, default: 0 },
  milestones: [MilestoneSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Roadmap', RoadmapSchema);
