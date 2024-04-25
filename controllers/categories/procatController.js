const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const ErrorHandlers = require("../../utils/ErrorHandler");
const ProductcatModel =  require("../../models/categories/productcatModel");

const createProductcat = asyncErrorHandler(async (req, res, next) => {
  try {
    const { category } = req.body;

    if (!category) return next(new ErrorHandlers(404, "category Required"));

    const categoryData = await ProductcatModel.create({
      name: category,
    });
    res.status(200).json({
      categoryData,
      message: "Category Added Successfully...",
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandlers(400, error.message));
  }
});

const getProductcat = asyncErrorHandler(async (req, res, next) => {
  try {
    const category = await ProductcatModel.find();
    if (!category) return next(new ErrorHandlers(404, "category not found"));

    res.status(200).json(
      {
      category,
      message: "Category data ",
      success: true,
    }
    );
  } catch (error) {
    return next(new ErrorHandlers(400, error.message));
  }
});




const deleteCategoryById = asyncErrorHandler(async (req, res, next) => {

  try {
    const _id = req.params.id;
    const product = await ProductcatModel.findByIdAndDelete(_id);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: {},
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = { createProductcat, getProductcat ,deleteCategoryById};
