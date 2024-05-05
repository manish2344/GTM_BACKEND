const mongoose = require("mongoose");

const directorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    //   required: true,
    },
     
    avatar: {
        type: String,
      },
      cloudinary_id: {
        type: String,
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Director", directorSchema);