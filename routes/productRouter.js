const express = require("express");
const productRouter = express.Router();
// const { isAuthenticated } = require("../middleware/isAdmin");
const { createProduct,getAllProducts, getProductById, deleteProductById } = require("../controllers/productController");
const multer = require("multer");
const cloudinary = require("./cloudinary");
const upload = require("./multer");
const productModel = require("../models/productModel.js");
// Multer configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); 
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname); 
//   },
// });

// const upload = multer({ storage: storage });

// Create a product with image upload
// productRouter.route("/product/create").post( upload.single("image"), createProduct);
// Create a product with image upload
productRouter.route("/product/create").post( upload.single("image"),

async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      let product = new productModel({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        subcategory: req.body.subcategory,
        price:req.body.price,
        avatar: result.secure_url,
        cloudinary_id: result.public_id,
      
      });
      // Save user
      await product.save();
      res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: product,
      });
    } catch (err) {
      console.log(err);
    }
  });
// Get all products
productRouter.route("/product/get").get(getAllProducts);
productRouter.route("/product/:id").get(getProductById);
productRouter.route("/product/:id").delete(deleteProductById );

module.exports = productRouter;
