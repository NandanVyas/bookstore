// Starting mongoDB
// import mongoose from 'mongoose';

const mongoose = require("mongoose");

const ForgotPasswordSchema = new mongoose.Schema(
  {
    // userID: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    token: { type: String, required: true }
  },
  { timestamps: true }
);

mongoose.models = {};
export default mongoose.model("ForgotPassword", ForgotPasswordSchema);
