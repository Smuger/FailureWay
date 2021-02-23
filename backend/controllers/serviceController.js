import asyncHandler from "express-async-handler";
import Service from "../models/serviceModel.js";
import User from "../models/userModel.js";
import path from "path";
import fs from "fs";

// @desc    Fetch all services
// @route   GET /api/services
// @access  Public
const getServices = asyncHandler(async (req, res) => {

  let services = null;
  if (req.query.keyword !== "") {
    const keywordProvider = req.query.keyword
      ? {
          provider: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    services = await Service.find({ ...keywordProvider }).lean();
  } else {
    services = await Service.find()
      .select({ _id: 1, name: 1, provider: 1, data: 1 })
      .lean();
  }

  if (services.length === 0) {
    const keywordName = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    services = await Service.find({ ...keywordName }).lean();
  }

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

  const { severity, downtime, comment, image } = req.body;

  const service = await Service.findById(req.params.id);

  const reportingUser = await User.findById(req.user._id);

  if (image) {
    const __dirname = path.resolve();

    var imagedata = fs.readFileSync(path.join(__dirname + image));

    fs.unlink(path.join(__dirname + image), (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });

    imagedata = JSON.parse(JSON.stringify(imagedata));

    imagedata = imagedata.data;

    var imageExt = "image/" + image.split(".")[1];
  }

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

      service.data.splice(dayNumber, 1);
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

    const newData = {
      name: dayOfTheWeek,
      minor: Number(newMinor),
      major: Number(newMajor),
      user: req.user._id,
    };

    if (image) {
      var newReport = {
        user: req.user._id,
        severity: Number(severity),
        downtime: Number(downtime),
        comment: comment,
        desc: image,
        img: {
          data: imagedata,
          contentType: imageExt,
        },
      };
    } else {
      var newReport = {
        user: req.user._id,
        severity: Number(severity),
        downtime: Number(downtime),
        comment: comment,
      };
    }

    service.data.unshift(newData);

    service.report.unshift(newReport);

    newReport.name = service.name;
    newReport.provider = service.provider;

    reportingUser.reportsFromThatUser.unshift(newReport);

    let serviceReportLastPosition = service.report.length - 1;

    try {
      await service.save();
      await reportingUser.save();
    } catch (error) {
      console.error("Service failed while saving: " + error);
    }

    res.status(201).json({ message: "Service added" });
  } else {
    res.status(404);
    throw new Error("Service not found");
  }
});

// @desc    Create new service
// @route   POST /api/service/create
// @access  Private
const createService = asyncHandler(async (req, res) => {
  const { name, provider, minorSLA, majorSLA } = req.body;

  const service = new Service({
    user: req.user._id,
    name: name,
    slaMinor: minorSLA,
    slaMajor: majorSLA,
    data: [],
    report: [],
    provider: provider,
  });

  try {
    await service.save();
    res.status(201).json({ message: "Service added" });
  } catch (error) {
    console.error("Creating service thrown following error: " + error);
    res.status(404);
    throw new Error("Unable to create service");
  }
});

export { getServices, getServiceById, updateServiceDowntime, createService };
