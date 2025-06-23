// strmly-backend/src/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true }, // store bcrypt hash
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);

