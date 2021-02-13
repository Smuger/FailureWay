import asyncHandler from "express-async-handler";
import Service from "../models/serviceModel.js";

// @desc    Fetch all services
// @route   GET /api/services
// @access  Public
const getServices = asyncHandler(async (req, res) => {
  const services = await Service.find({});
  res.json(services);
});

// @desc    Fetch single service
// @route   GET /api/service/:id
// @access  Public
const getServiceById = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (service) {
    res.json(service);
  } else {
    res.status(404);
    throw new Error("Service not found");
  }
});

// @desc    Create new review
// @route   POST /api/service/:id/downtime
// @access  Private
const updateServiceDowntime = asyncHandler(async (req, res) => {
  let newMinor = 0;
  let newMajor = 0;

  const { severity, downtime, comment } = req.body;

  const service = await Service.findById(req.params.id);

  console.log("data length: " + service.data.length);

  console.log("Downtime: " + downtime);
  console.log("Database Minor: " + service.data[0].minor);
  console.log("database Major: " + service.data[0].major);
  service.data[0].minor;

  if (service) {
    if (service.data.length > 0) {
      // TODO: Check day

      switch (severity) {
        case 0:
          newMinor = service.data[0].minor + downtime;
          newMajor = service.data[0].major;
          console.log("data over 0 newMinor: " + newMinor);
          break;
        case 1:
          newMajor = service.data[0].major + downtime;
          newMinor = service.data[0].minor;
          console.log("data over 0 newMajor: " + newMajor);
          break;
      }
      service.data.shift();
    } else {
      switch (severity) {
        case 0:
          newMinor = downtime;
          console.log("data under 0 newMinor: " + newMinor);
          break;

        case 1:
          newMajor = downtime;
          console.log("data under 0 newMajor: " + newMajor);
          break;
      }
    }

    const monday = {
      name: req.user.name,
      minor: newMinor,
      major: newMajor,
      user: req.user._id,
    };

    console.log("newMinor: " + newMinor);
    console.log("newMajor: " + newMajor);

    service.data.push(monday);

    await service.save();
    res.status(201).json({ message: "Service added" });
  } else {
    res.status(404);
    throw new Error("Service not found");
  }
});

export { getServices, getServiceById, updateServiceDowntime };
