const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['Video', 'Article', 'Practice', 'Notes'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  topic: { type: String, required: true },   // e.g., 'DSA', 'OS', 'DBMS'
  sourceName: { type: String, required: true }, // e.g., 'YouTube', 'LeetCode', 'GeeksforGeeks'
  url: { type: String, required: true },
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resource', ResourceSchema);
