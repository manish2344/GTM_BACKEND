const Director = require("../models/direactor.js");
// const router = express.Router();
// const cloudinary = require("../routes/cloudinary.js");
// const upload = require("../routes/multer.js");

const createDirector = async (req, res) => {
  try {
    const { name, position } = req.body;

    if (!name || !position) {
      return res.status(401).json({
        success: false,
        message: "Please Fill Required Fields",
      });
    }

    const profileImagepath = req.files?.profileImage[0]?.path;

    if (!profileImagepath) {
      return res.status(401).json({
        success: false,
        message: "Please Provide Profile Image",
      });
    }

    const profileImageupload = await uploadImageOnCloudinary(profileImagepath);

    if (!profileImageupload || profileImageupload.error) {
      console.error(
        "Error uploading cover image to Cloudinary:",
        profileImageupload.error
      );
      return res.status(500).json({
        success: false,
        message: "Server error while uploading image to Cloudinary",
      });
    }

    const newDirector = await Director.create({
      name,
      position,
      profileImage: profileImageupload.url,
    });

    if (!newDirector) {
      return res.status(500).json({
        success: false,
        message: "Server Error while creating new Job! Please try again",
      });
    }
    return res.status(200).json({
      success: true,
      message: "New Director Created Successfully",
      data: newDirector,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
      error: error,
    });
  }
};

const getDirectors = async (req, res) => {
  try {
    const allDirectors = await Director.find();
    if (!allDirectors) {
      return res.status(500).json({
        success: false,
        message: "Error while Fetching All Directors",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All Directors Fetched Successfully",
      data: allDirectors,
    });
  } catch (error) {
    console.log("Error from server While gettin all Directors", error);
    res.status(500).json({
      success: false,
      message: "Server Error in Getting All Directors",
    });
  }
};

const getDirectorById = async (req, res) => {
  try {
    const { directorId } = req.params;
    const director = await Director.findById(directorId);
    if (!director) {
      return res.status(500).json({
        success: false,
        message: "Error while Fetching Director",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Director fetched Successfully",
      data: director,
    });
  } catch (error) {
    console.log("Error from Server side While fetching Director", error);
    res.status(500).json({
      message: false,
      message: "Server Error while Fetching Director",
    });
  }
};

const deleteDirector = async (req, res) => {
  try {
    const { directorId } = req.params;

    const director = await Director.findByIdAndDelete(directorId);
    if (!director) {
      return res.status(500).json({
        success: false,
        message: "Error While deleting Director! please try again",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Director Deleted Successfully",
    });
  } catch (error) {
    console.log("Error from sever Side While Deleting Director", error);
  }
};

module.exports = {
  createDirector,
  getDirectors,
  getDirectorById,
  deleteDirector,
}