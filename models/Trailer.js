const mongoose = require("mongoose");

const trailerSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String, // This will hold the Azure video URL
});

module.exports = mongoose.model("Trailer", trailerSchema);
