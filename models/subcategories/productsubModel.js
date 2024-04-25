const mongoose = require("mongoose");

const productsubcatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const ProductsubcatModel = mongoose.model("Product Subcategory", productsubcatSchema);

module.exports = ProductsubcatModel;
