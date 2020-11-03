const mongoose = require("mongoose");

//Generating Schema
const urlSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const UrlModel = mongoose.model("URLModel", urlSchema);
module.exports.UrlModel = UrlModel;
