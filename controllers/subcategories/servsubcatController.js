const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const ErrorHandlers = require("../../utils/ErrorHandler");
const ServicesubcatModel = require("../../models/subcategories/servicesubModel");

const createServicesubcat = asyncErrorHandler(async (req, res, next) => {
  try {
    const { subcategory } = req.body;

    if (!subcategory)
      return next(new ErrorHandlers(404, "subcategory Required"));

    const subcategoryData = await ServicesubcatModel.create({
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

const getServicesubcat = asyncErrorHandler(async (req, res, next) => {
  try {
    const subcategory = await ServicesubcatModel.find();
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

module.exports = { createServicesubcat, getServicesubcat };
