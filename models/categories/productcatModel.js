const mongoose = require("mongoose");

const productcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const ProductcatModel = mongoose.model("Product Category", productcategorySchema);

module.exports = ProductcatModel;
