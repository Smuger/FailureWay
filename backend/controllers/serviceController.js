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
  let dayNumber = 0;

  let weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  let day = new Date();
  let dayOfTheWeek = weekday[day.getDay()];

  const { severity, downtime, comment } = req.body;

  const service = await Service.findById(req.params.id);

  if (service) {
    let sameDay = false;

    for (let i = 0; i < service.data.length; i++) {
      if (service.data[i].name === dayOfTheWeek) {
        dayNumber = i;
        sameDay = true;
      }
    }

    if (sameDay) {
      switch (severity) {
        case 0:
          newMinor = service.data[dayNumber].minor + downtime;
          newMajor = service.data[dayNumber].major;
          break;
        case 1:
          newMajor = service.data[dayNumber].major + downtime;
          newMinor = service.data[dayNumber].minor;
          break;
      }
    } else {
      switch (severity) {
        case 0:
          newMinor = downtime;
          break;

        case 1:
          newMajor = downtime;
          break;
      }
    }

    service.data.splice(dayNumber, 1);

    const monday = {
      name: dayOfTheWeek,
      minor: newMinor,
      major: newMajor,
      user: req.user._id,
    };

    service.data.push(monday);

    await service.save();
    res.status(201).json({ message: "Service added" });
  } else {
    res.status(404);
    throw new Error("Service not found");
  }
});

export { getServices, getServiceById, updateServiceDowntime };
