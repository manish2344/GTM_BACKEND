const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name:String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service Category",
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service Category",
  }, 
  description: String,
  avatar: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  }, 
});

const serviceModel = mongoose.model("Services", serviceSchema);

module.exports = serviceModel;
