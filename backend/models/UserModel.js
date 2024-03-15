const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    clerkUserId: { type: String, unique: true, required: true },
    firstName: String,
    lastName: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);

