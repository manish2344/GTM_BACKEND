const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const ErrorHandlers = require("../../utils/ErrorHandler");
const ProductsubcatModel = require("../../models/subcategories/productsubModel");

const createProductsubcat = asyncErrorHandler(async (req, res, next) => {
  try {
    const { subcategory } = req.body;

    if (!subcategory)
      return next(new ErrorHandlers(404, "subcategory Required"));

    const subcategoryData = await ProductsubcatModel.create({
      name: subcategory,
    });
    res.status(200).json({
      subcategoryData,
      message: "subCategory Added Successfully...",
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandlers(400, error.message));
  }
});

const getProductsubcat = asyncErrorHandler(async (req, res, next) => {
  try {
    const subcategory = await ProductsubcatModel.find();
    if (!subcategory)
      return next(new ErrorHandlers(404, "subcategory not found"));

    res.status(200).json({
      subcategory,
      message: "subCategory data...",
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandlers(400, error.message));
  }
});

module.exports = { createProductsubcat, getProductsubcat };
