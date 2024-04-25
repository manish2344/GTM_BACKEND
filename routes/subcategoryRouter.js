const express = require("express");
const subCategoryRouter = express.Router();
const TeamsubcatModel = require("../models/subcategories/teamsubModel.js");
// const TeamsubcatModel = require("../models/subcategories/teamsubModel.js");
const ProductsubcatModel = require("../models/subcategories/productsubModel.js");

const {
    createProductsubcat,
    getProductsubcat,
  } = require("../controllers/subcategories/prosubcatController");
  const {
    createServicesubcat,
    getServicesubcat,
  } = require("../controllers/subcategories/servsubcatController");
  const {
    createTeamsubcat,
    getTeamsubcat,
  } = require("../controllers/subcategories/teamsubcatController");

  // subCategoryRouter.route("/subcategory/product/create").post(createProductsubcat);
  subCategoryRouter.post("/subcategory/product/create",async (req, res) => {
    try {
      // const result = await cloudinary.uploader.upload(req.file.path);
      let user = new ProductsubcatModel({
        name: req.body.name
      });
      // Save user
      await user.save();
      res.json(user);
    } catch (err) {
      console.log(err);
    }
  });
  subCategoryRouter.route("/subcategory/product/get").get(getProductsubcat);

  subCategoryRouter.route("/subcategory/service/create").post(createServicesubcat);
  subCategoryRouter.route("/subcategory/service/get").get(getServicesubcat);

  // subCategoryRouter.route("/subcategory/team/create").post(createTeamsubcat);
  subCategoryRouter.route("/subcategory/team/get").get(getTeamsubcat);
subCategoryRouter.post("/subcategory/team/create",async (req, res) => {
    try {
      // const result = await cloudinary.uploader.upload(req.file.path);
      let user = new TeamsubcatModel({
        name: req.body.name
      });
      // Save user
      await user.save();
      res.json(user);
    } catch (err) {
      console.log(err);
    }
  });
module.exports = subCategoryRouter;