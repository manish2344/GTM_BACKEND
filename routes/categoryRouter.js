const express = require("express");

const categoryRouter = express.Router();
const productModel = require("../models/categories/productcatModel");
const {
  createProductcat,
  getProductcat,
  deleteCategoryById,

} = require("../controllers/categories/procatController");
const {
  createServicecat,
  getServicecat,
} = require("../controllers/categories/servcatController");
const {
 
  getTeamcat,
} = require("../controllers/categories/teamcatcontroller");
const TeamcatModel = require("../models/categories/teamcatModel");

categoryRouter.route("/category/product/create").post(createProductcat);
categoryRouter.post("/category/product/add",async (req, res) => {
  try {
    // const result = await cloudinary.uploader.upload(req.file.path);
    let user = new productModel({
      name: req.body.name
    });
    // Save user
    await user.save();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});
categoryRouter.route("/category/product/get").get(getProductcat);

categoryRouter.route("/category/product/:id").delete(deleteCategoryById);

categoryRouter.route("/category/service/create").post(createServicecat);
categoryRouter.route("/category/service/get").get(getServicecat);

// categoryRouter.route("/category/team/create").post(createTeamcat);
categoryRouter.route("/category/team/get").get(getTeamcat);
categoryRouter.post("/category/team/create",async (req, res) => {
    try {
      // const result = await cloudinary.uploader.upload(req.file.path);
      let user = new TeamcatModel({
        name: req.body.name
      });
      // Save user
      await user.save();
      res.json(user);
    } catch (err) {
      console.log(err);
    }
  });
module.exports = categoryRouter;
