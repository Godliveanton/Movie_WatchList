const { Int32 } = require("mongodb");
const mongoose = require("mongoose");

const movieDetailsSchema = mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Released_Year: {
    type: Number,
  },
  Genre: {
    type: String,
  },
  Description: {
    type: String,
  },
  Rating: {
    type: Number,
  },
  Review: {
    type: String,
  },
});

exports.movie_details = mongoose.model("movie_details", movieDetailsSchema);
