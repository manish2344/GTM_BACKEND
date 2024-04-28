const express = require("express");
const cloudinary = require("./cloudinary.js");
const upload = require("./multer.js");
// const upload = require("../Middelware/Multer.middelware");
const {
  createDirector,
  getDirectors,
  getDirectorById,
  deleteDirector,
} = require("../controllers/direactor.js");
const direactor = require("../models/direactor");
const router = express.Router();

// router
//   .route("/createDirector")
//   .post(upload.fields([{ name: "profileImage", maxCount: 1 }]), createDirector);

router.post("/createdirector", upload.single("image"),
// verifyToken, 
async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      let direct = new direactor({
        name:req.body.name,
        position:req.body.position,
        
        avatar: result.secure_url,
        cloudinary_id: result.public_id,
        
      });
      // Save user
      await direct.save();
      res.json(direct);
    } catch (err) {
      console.log(err);
    }
  });

router.route("/getalldirector").get(getDirectors);
router.route("/getdirectorbyid/:directorId").get(getDirectorById);
router.route("/deletedirector/:directorId").delete(deleteDirector);
module.exports = router;