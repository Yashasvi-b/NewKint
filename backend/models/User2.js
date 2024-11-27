const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    pd: { type: String, required: true },
    progress: { type: Number, default: 0 }, // Add progress field
  });
  
  const User2 = mongoose.model("User2", userSchema);
  
  module.exports = User2;
  