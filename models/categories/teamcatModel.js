const mongoose = require("mongoose");

const teamcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const TeamcatModel = mongoose.model("Team Category", teamcategorySchema);

module.exports = TeamcatModel;
