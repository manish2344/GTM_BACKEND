const mongoose = require("mongoose");

const teamsubcatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const TeamsubcatModel = mongoose.model("Team Subcategory", teamsubcatSchema);

module.exports = TeamsubcatModel;
