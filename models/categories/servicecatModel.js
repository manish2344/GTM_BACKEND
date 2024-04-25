const mongoose = require("mongoose");

const servicecategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const ServicecatModel = mongoose.model("Service Category", servicecategorySchema);

module.exports = ServicecatModel;
