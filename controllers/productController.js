const productModel = require("../models/productModel");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const ErrorHandler = require("../utils/ErrorHandler");

// Create a new product 
const createProduct = asyncErrorHandler(async (req, res, next) => {
  const { name, category, subcategory, price } = req.body;
const productImage=req.file


  if (!name || !category || !subcategory || !price) {
    return next(new ErrorHandler(400, "Name, category, subcategory, and price are required"));
  }

  try {
    const product = await productModel.create({
      name,
      category,
      subcategory,
      price,
      image:productImage.filename
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    return next(error);
  }
});

// Get all products
const getAllProducts = asyncErrorHandler(async (req, res, next) => {
  try {
      const products = await productModel.find().populate("category").populate("subcategory");
      
    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    return next(error);
  }
});

// Get a single product by ID
const getProductById = asyncErrorHandler(async (req, res, next) => {
  const productId = req.params.id;

  try {
    const product = await productModel.findById(productId);

    if (!product) {
      return next(new ErrorHandler(404, "Product not found"));
    }

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    return next(error);
  }
});

// Update a product by ID
const updateProductById = asyncErrorHandler(async (req, res, next) => {
  const productId = req.params.id;
  const { name, category, subcategory, price, image } = req.body;

  try {
    let product = await productModel.findById(productId);

    if (!product) {
      return next(new ErrorHandler(404, "Product not found"));
    }

    product.name = name || product.name;
    product.category = category || product.category;
    product.subcategory = subcategory || product.subcategory;
    product.price = price || product.price;
    product.image = image || product.image;

    product = await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    return next(error);
  }
});

// Delete a product by ID
const deleteProductById = asyncErrorHandler(async (req, res, next) => {

  try {
    const _id = req.params.id;
    const product = await productModel.findByIdAndDelete(_id);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: {},
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
