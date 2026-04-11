const mongoose = require('mongoose');

const MockTestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  accuracy: { type: Number },
  timeTakenMinutes: { type: Number },
  dateTaken: { type: Date, default: Date.now },
  weakTopics: [String]
});

module.exports = mongoose.model('MockTest', MockTestSchema);
