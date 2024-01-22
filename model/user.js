const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 5,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      min: 5,
      max: 255,
    },
    isUG: {
      type: Boolean,
      default:true
  },
    password: {
      type: String,
      required: true,
      min: 5,
      max: 255,
    },
    backup: {
      type: String,
      min: 5,
      max: 255,
    },

  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("User", userSchema);
