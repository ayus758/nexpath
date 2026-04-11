const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  targetGoal: { 
    type: String, 
    enum: ['GATE', 'UPSC', 'JEE', 'Placement', 'Other'], 
    default: 'Placement' 
  },
  skillLevel: { 
    type: String, 
    enum: ['Beginner', 'Intermediate', 'Advanced'], 
    default: 'Beginner' 
  },
  targetBranch: { type: String, default: 'CSE' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
