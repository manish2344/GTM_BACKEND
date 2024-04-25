const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name:String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory",
  },
  description: String,
  image: String,
});

const serviceModel = mongoose.model("Services", serviceSchema);

module.exports = serviceModel;
