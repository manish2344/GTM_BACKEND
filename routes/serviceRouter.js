const express = require("express");
const servicesRouter = express.Router();
const { createService,getAllServices } = require("../controllers/serviceController");

const serviceModel = require("../models/serviceModel");
const cloudinary = require("./cloudinary");
const upload = require("./multer");

servicesRouter.route("/service/create").post( upload.single("image"),

async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      let product = new serviceModel({
        name: req.body.name,
        description: req.body.description,
        category:req.body.category,
        // subcategory: req.body.subcategory,
        // price:req.body.price,
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

servicesRouter.route("/service/get").get(getAllServices);


module.exports = servicesRouter;