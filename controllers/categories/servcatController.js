const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const ErrorHandlers = require("../../utils/ErrorHandler");
const ServicecatModel = require("../../models/categories/servicecatModel");

const createServicecat = asyncErrorHandler(async (req, res, next) => {
  try {
    const { category } = req.body;

    if (!category) return next(new ErrorHandlers(404, "category Required"));

    const categoryData = await ServicecatModel.create({
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

const getServicecat = asyncErrorHandler(async (req, res, next) => {
  try {
    const category = await ServicecatModel.find();
    if (!category) return next(new ErrorHandlers(404, "category not found"));

    res.status(200).json({
      category,
      message: "Category data ",
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandlers(400, error.message));
  }
});

module.exports = { createServicecat, getServicecat };
