// const express = require("express");
const router = require("express").Router()
const {
  createJob,
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

router.route("/getalljobs").get(getJobs);
router.route("/getjobbyid/:jobId").get(getJobById);
router.route("/deletejob/:jobId").delete(deleteJob);
module.exports = router;