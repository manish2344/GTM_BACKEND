const express = require("express");
const servicesRouter = express.Router();
const { createService,getAllServices } = require("../controllers/serviceController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

servicesRouter.route("/career/create").post( upload.single("image"),

async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      let career = new Job({
        title: req.body.title,
        position: req.body.position,
        // category: req.body.category,
        // subcategory: req.body.subcategory,
        experience:req.body.experience,
        avatar: result.secure_url,
        cloudinary_id: result.public_id,
        vacancies: req.body.vacancies,
        joblocation:req.body.joblocation,
        joining: req.body.joining,
        overview:req.body.overview,
        responsibilities: req.body.responsibilities,
        requirements:req.body.requirements,
        department:req.body.department,
      });
      // Save user
      await career.save();
      res.status(201).json({
        success: true,
        message: " created successfully",
        data: career,
      });
    } catch (err) {
      console.log(err);
    }
  });

servicesRouter.route("/service/get").get(getAllServices);


module.exports = servicesRouter;