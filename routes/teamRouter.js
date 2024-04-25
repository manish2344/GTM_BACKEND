const express = require("express");
const teamModel = require("../models/teamModel.js");
const teamRouter = express.Router();
const cloudinary = require("./cloudinary");
const upload = require("./multer");
const { createMember,getAllMembers, deleteTeamById, getMemberById } = require("../controllers/teamController");


// Create a Member with image upload
// teamRouter.route("/team/create").post(upload.single("image"), createMember);
teamRouter.route("/team/create").post( upload.single("image"),

async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      let user = new teamModel({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        subcategory: req.body.subcategory,
        socialHandle: req.body.socialHandle,
        avatar: result.secure_url,
        cloudinary_id: result.public_id,
      
      });
      // Save user
      await user.save();
      res.json(user);
    } catch (err) {
      console.log(err);
    }
  });
// Get all Memmbers
teamRouter.route("/team/get").get(getAllMembers);
teamRouter.route("/team/:id").delete(deleteTeamById );
teamRouter.route("/team/:id").get(getMemberById);




module.exports = teamRouter;
