const Job = require("../models/Career.js");
// const uploadImageOnCloudinary = require("../utils/ImageUpload");

const createJob = async (req, res) => {
  try {
    const {
      title,
      position,
      vacancies,
      experience,
      joblocation,
      joining,
      overview,
      responsibilities,
      requirements,
      department,
    } = req.body;

    if (
      !title ||
      !position ||
      !vacancies ||
      !experience ||
      !joblocation ||
      !joining ||
      !overview ||
      !responsibilities ||
      !requirements ||
      !department
    ) {
      return res.status(401).json({
        success: false,
        message: "Please Fill Required Fields",
      });
    }

    const coverImagepath = req.files?.coverImage[0]?.path;

    if (!coverImagepath) {
      return res.status(401).json({
        success: false,
        message: "Please Provide Cover Image",
      });
    }

    const coverImageupload = await uploadImageOnCloudinary(coverImagepath);

    if (!coverImageupload || coverImageupload.error) {
      console.error(
        "Error uploading cover image to Cloudinary:",
        coverImageupload.error
      );
      return res.status(500).json({
        success: false,
        message: "Server error while uploading image to Cloudinary",
      });
    }

    const newJob = await Job.create({
      title,
      position,
      vacancies,
      experience,
      joblocation,
      joining,
      overview,
      responsibilities,
      requirements,
      department,
      coverImage: coverImageupload.url,
    });

    if (!newJob) {
      return res.status(500).json({
        success: false,
        message: "Server Error while creating new Job! Please try again",
      });
    }
    return res.status(200).json({
      success: true,
      message: "New Job Created Successfully",
      data: newJob,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
      error: error,
    });
  }
};

const getJobs = async (req, res) => {
  try {
    const allJobs = await Job.find();
    if (!allJobs) {
      return res.status(500).json({
        success: false,
        message: "Error while Fetching All Jobs",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All Jobs Fetched Successfully",
      data: allJobs,
    });
  } catch (error) {
    console.log("Error from server While gettin all Jobs", error);
    res.status(500).json({
      success: false,
      message: "Server Error in Getting All Jobs",
    });
  }
};

const getJobById = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(500).json({
        success: false,
        message: "Error while Fetching Job",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Job fetched Successfully",
      data: job,
    });
  } catch (error) {
    console.log("Error from Server side While fetching job", error);
    res.status(500).json({
      message: false,
      message: "Server Error while Fetching Jobs",
    });
  }
};

const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findByIdAndDelete(jobId);
    if (!job) {
      return res.status(500).json({
        success: false,
        message: "Error While deleting job! please try again",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job Deleted Successfully",
    });
  } catch (error) {
    console.log("Error from sever Side While Deleting Job", error);
  }
};

module.exports = {
  createJob,
  getJobs,
  getJobById,
  deleteJob,
};