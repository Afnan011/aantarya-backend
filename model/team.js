const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
});

const teamSchema = new mongoose.Schema(
  {
    collegeName: {
      type: String,
      required: true,
      min: 5,
      max: 255,
    },
    teamName:{
        type: String,
        default: "guest"
    },
    isUG: {
        type:Boolean,
        required: true,
        default:true
    },
    email: {
      type: String,
      required: true,
      min: 5,
      max: 255,
    },
    accommodation: {
      countOfBoys: Number,
      countOfGirls: Number,
    },
    paymentStatus: {
      verificationStatus: {
        type: Boolean,
        default: false
      },
      transactionId: String,
      screenshot: String,
    },
    events: {
      itManager: userSchema,
      photography: userSchema,
      productLaunch: userSchema,
      designing: userSchema,
      coding: [userSchema],
      web: [userSchema],
      quiz: [userSchema],
      debate: userSchema,
      dance: [userSchema],
      gaming: [userSchema],
      treasure: [userSchema],
      dumbCharades: [userSchema],
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Team", teamSchema);
