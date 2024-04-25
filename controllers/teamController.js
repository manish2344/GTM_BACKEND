const teamModel = require("../models/teamModel");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const ErrorHandler = require("../utils/ErrorHandler");

// Create a new member
const createMember = asyncErrorHandler(async (req, res, next) => {
  const { name, category, subcategory, description, socialHandle } = req.body;
  const memberImage = req.file;
  try {
    if (!name || !category || !subcategory || !description || !socialHandle)
      return next(new ErrorHandler("400", "all member Data Required"));
    const newMember = await teamModel.create({
      name,
      category,
      subcategory,
      description,
      socialHandle,
      image: memberImage.filename,
    });

    res.status(201).json({
      success: true,
      message: "Member created successfully",
      data: newMember,
    });
  } catch (error) {
    return next(error);
  }
});
const deleteTeamById = asyncErrorHandler(async (req, res, next) => {

  try {
    const _id = req.params.id;
    const Team = await  teamModel.findByIdAndDelete(_id);
    res.status(200).json({
      success: true,
      message: "Team deleted successfully",
      data: {},
    });
  } catch (error) {
    return next(error);
  }
});

// Get all members
const getAllMembers = asyncErrorHandler(async (req, res) => {
  try {
    const members = await teamModel
      .find()
      .populate("category")
      .populate("subcategory");

    if (!members) return next(new ErrorHandler("404", "members not Found"));
    res.status(200).json({
      success: true,
      message: "Members fetched successfully",
      data: members,
    });
  } catch (error) {
    return next(error);
  }
});

// Get a member by ID
const getMemberById = asyncErrorHandler(async (req, res) => {
  const memberId = req.params.id;
  const member = await teamModel
    .findById(memberId)
    .populate("category")
    .populate("subcategory");
  if (!member) {
    return ErrorHandler(res, "Member not found", 404);
  }
  res.json(member);
});

// Update a member by ID
const updateMember = asyncErrorHandler(async (req, res) => {
  const memberId = req.params.id;
  const { name, image, category, subcategory, description, socialHandle } =
    req.body;

  // Find the member by ID and update its fields
  const updatedMember = await teamModel.findByIdAndUpdate(
    memberId,
    { name, image, category, subcategory, description, socialHandle },
    { new: true }
  );

  if (!updatedMember) {
    return ErrorHandler(res, "Member not found", 404);
  }

  res.json(updatedMember);
});

// Delete a member by ID
const deleteMember = asyncErrorHandler(async (req, res) => {
  const memberId = req.params.id;

  // Find the member by ID and delete it
  const deletedMember = await teamModel.findByIdAndDelete(memberId);

  if (!deletedMember) {
    return ErrorHandler(res, "Member not found", 404);
  }

  res.json({ message: "Member deleted successfully" });
});

module.exports = {
  createMember,
  getAllMembers,
  deleteTeamById,
  getMemberById
};
