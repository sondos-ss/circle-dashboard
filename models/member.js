const mongoose = require('mongoose');
const member = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    subcircle: {
      type: String,
      enum: ["NodeJS", "PHP", "Java", ".NET"],
      required: true
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true
    }
  },
  {
    timestamps: true
  }
);
module.exports = mongoose.model('Member', member);
