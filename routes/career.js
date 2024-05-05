// const express = require("express");
const router = require("express").Router()
const {
  getJobs,
  getJobById,
  deleteJob,
} = require("../controllers/Career.js");
// const upload = require("../Middelware/Multer.middelware");
// const Career = require("../models/Career");
const Job = require("../models/Career.js");
// const router = express.Router();
const cloudinary = require("./cloudinary");
const upload = require("./multer");

router.route("/career/create").post( upload.single("image"),

async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      let product = new Job({
        title: req.body.title,
        description:req.body.description,
        requirements:req.body.requirements,
        responsibilities: req.body.responsibilities,
        department:req.body.department,
        avatar: result.secure_url,
        cloudinary_id: result.public_id,

        experience:req.body.experience,
        vacancies:req.body.vacancies,
        joblocation: req.body.joblocation,

        joining:req.body.joining,
        position:req.body.position,
        overview:req.body.overview
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
router.route("/getalljobs").get(getJobs);
router.route("/getjobbyid/:jobId").get(getJobById);
router.route("/deletejob/:jobId").delete(deleteJob);
module.exports = router;