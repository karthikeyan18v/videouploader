// strmly-backend/src/models/Video.js
const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String },
  url:         { type: String, required: true },
  owner:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Video', VideoSchema);
