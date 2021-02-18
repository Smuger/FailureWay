import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import {
  getServices,
  getServiceById,
  updateServiceDowntime,
  createService,
} from "../controllers/serviceController.js";

const router = express.Router();

router.route("/").get(getServices);

router.route("/:id/report").post(protect, updateServiceDowntime);

router.route("/create").post(protect, createService);

router.route("/:id").get(getServiceById);

export default router;
