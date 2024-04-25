const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product Category",
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product Subcategory",
  }, 
  price: {
    type: Number,
    required: true,
  },
  // image: String,
  avatar: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  }, 
  description: String,
});

const productModel = mongoose.model("Products", productSchema);

module.exports = productModel;
