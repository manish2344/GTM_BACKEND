const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const ErrorHandlers = require("../../utils/ErrorHandler");
const TeamsubcatModel = require("../../models/subcategories/teamsubModel");

const createTeamsubcat = asyncErrorHandler(async (req, res, next) => {
  try {
    const { subcategory } = req.body;

    if (!subcategory)
      return next(new ErrorHandlers(404, "subcategory Required"));

    const subcategoryData = await TeamsubcatModel.create({
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

const getTeamsubcat = asyncErrorHandler(async (req, res, next) => {
  try {
    const subcategory = await TeamsubcatModel.find();
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

module.exports = { createTeamsubcat, getTeamsubcat };
