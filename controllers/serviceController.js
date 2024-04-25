const serviceModel = require("../models/serviceModel");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const ErrorHandler = require("../utils/ErrorHandler");

// Create a new service
exports.createService = asyncErrorHandler(async (req, res) => {
  const {name, category, subcategory, description } = req.body;
  const serviceImage = req.file;

  // Create a new service instance
  const newService = await serviceModel.create({
    name,
    category,
    subcategory,
    description,
    image: serviceImage.filename,
  });

  res.status(201).json({
    success: true,
    message: "services created successfully",
    data: newService,
  });
});

// Get all services
exports.getAllServices = asyncErrorHandler(async (req, res) => {
  const services = await serviceModel.find()
    .populate("category")
    .populate("subcategory");
    res.status(201).json({
      success: true,
      message: "services fetch successfully",
      data: services,
    });
});

// Get a service by ID
exports.getServiceById = asyncErrorHandler(async (req, res) => {
  const serviceId = req.params.id;
  const service = await serviceModel.findById(serviceId)
    .populate("category")
    .populate("subcategory");
  if (!service) {
    throw new ErrorHandler(404, "Service not found");
  }
  res.json(service);
});

// Update a service by ID
exports.updateService = asyncErrorHandler(async (req, res) => {
  const serviceId = req.params.id;
  const { category, subcategory, description } = req.body;

  const updatedService = await serviceModel.findByIdAndUpdate(
    serviceId,
    { category, subcategory, description },
    { new: true }
  );

  if (!updatedService) {
    throw new ErrorHandler(404, "Service not found");
  }

  res.json(updatedService);
});

// Delete a service by ID
exports.deleteService = asyncErrorHandler(async (req, res) => {
  const serviceId = req.params.id;

  // Find the service by ID and delete it
  const deletedService = await serviceModel.findByIdAndDelete(serviceId);

  if (!deletedService) {
    throw new ErrorHandler(404, "Service not found");
  }

  res.json({ message: "Service deleted successfully" });
});
