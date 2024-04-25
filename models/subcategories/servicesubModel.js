const mongoose = require("mongoose");

const servicesubcatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const ServicesubcatModel = mongoose.model("Service Subcategory", servicesubcatSchema);

module.exports = ServicesubcatModel;
