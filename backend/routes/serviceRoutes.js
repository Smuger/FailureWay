import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import {
  getServices,
  getServiceById,
  updateServiceDowntime,
} from "../controllers/serviceController.js";

const router = express.Router();

router.route("/").get(getServices);

router.route("/:id/report").post(protect, updateServiceDowntime);

router.route("/:id").get(getServiceById);

export default router;
