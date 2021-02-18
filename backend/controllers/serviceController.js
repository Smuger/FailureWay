import asyncHandler from "express-async-handler";
import Service from "../models/serviceModel.js";
import path from "path";
import fs from "fs";

// @desc    Fetch all services
// @route   GET /api/services
// @access  Public
const getServices = asyncHandler(async (req, res) => {
  const keywordProvider = req.query.keyword
    ? {
        provider: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  let services = await Service.find({ ...keywordProvider });

  if (services.length === 0) {
    const keywordName = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    services = await Service.find({ ...keywordName });
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

  //console.log(req.body);

  // const imagedata = fs.readFileSync(path.join(__dirname + image), {
  //   encoding: "base64",
  // });
  const service = await Service.findById(req.params.id);
  //console.log("Service to update found: ");

  // Check if report with image
  if (image) {
    //console.log("Image found");
    // Get current directory
    const __dirname = path.resolve();

    // get file that was uploaded before
    var imagedata = fs.readFileSync(path.join(__dirname + image));

    imagedata = JSON.parse(JSON.stringify(imagedata));

    imagedata = imagedata.data;

    // get the image extention
    var imageExt = "image/" + image.split(".")[1];
  }

  //console.log("severity: " + severity);

  // Check is service was found
  if (service) {
    //console.log("Working on service");
    let sameDay = false;

    // Is there there data from specific day alreay in weekly summary?
    for (let i = 0; i < service.data.length; i++) {
      if (service.data[i].name === dayOfTheWeek) {
        dayNumber = i;
        sameDay = true;
      }
    }

    //console.log("Is this an update to existing data? ");
    //console.log(sameDay);

    // Update with new data
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
      // remove previous weekly data
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

    //console.log("newMinor: ");
    //console.log(newMinor);

    //console.log("newMajor: ");
    //console.log(newMajor);

    //console.log("dayOfTheWeek: ");
    //console.log(dayOfTheWeek);

    //console.log("req.user._id: ");
    //console.log(req.user._id);

    const newData = {
      name: dayOfTheWeek,
      minor: Number(newMinor),
      major: Number(newMajor),
      user: req.user._id,
    };

    //console.log("newData: ");
    //console.log(newData);

    if (image) {
      //console.log("req.user._id: " + req.user._id);
      //console.log("severity: " + severity);
      //console.log("downtime: " + downtime);
      //console.log("comment: " + comment);
      //console.log("image: " + image);
      //console.log("imagedata: " + imagedata);
      //console.log("imageExt: " + imageExt);

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
      //console.log("req.user._id: " + req.user._id);
      //console.log("severity: " + severity);
      //console.log("downtime: " + downtime);
      //console.log("comment: " + comment);

      var newReport = {
        user: req.user._id,
        severity: Number(severity),
        downtime: Number(downtime),
        comment: comment,
      };
    }
    //console.log("newData: " + JSON.stringify(newData));

    service.data.push(newData);
    //console.log("newReport: ");
    //console.log(newReport);

    service.report.push(newReport);

    let serviceReportLastPosition = service.report.length - 1;

    //console.log("EVERYTHING IS DONE");

    try {
      await service.save();
    } catch (error) {
      console.error("Service failed while saving: " + error);
    }

    //console.log("Failed to save?");
    res.status(201).json({ message: "Service added" });
  } else {
    res.status(404);
    throw new Error("Service not found");
  }
});

export { getServices, getServiceById, updateServiceDowntime };
