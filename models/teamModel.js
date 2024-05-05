const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    // required: true,
  },
  avatar: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  }, 
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team Category",
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team Subcategory",
  },
  description: String,
  // socialHandle: String,
  socialHandlers: {
    facebook: String,
    email: String,
    linkedin: String
  }
  // socialHandle: [
  //   {
  //     type: String,
  //     required: true,
  //   },
  // ],
});

const teamModel =   mongoose.model('Team', teamSchema);
// mongoose.model.teamModel ||
module.exports = teamModel;
