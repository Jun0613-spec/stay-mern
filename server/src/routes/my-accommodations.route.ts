import express from "express";

import verifyToken from "../middleware/verify-token";

import { upload } from "../config/multer";

import {
  createAccommodation,
  getMyAccommodations,
  getMyAccommodationById,
  updateMyAccommodation,
  deleteMyAccommodation
} from "../controllers/my-accommodations.controller";

const router = express.Router();

// Buisness account routes
router.get("/", verifyToken, getMyAccommodations);
router.get("/:accommodationId", verifyToken, getMyAccommodationById);
router.post(
  "/",
  verifyToken,
  upload.array("imageFiles", 6),
  createAccommodation
);

router.put(
  "/:accommodationId",
  verifyToken,
  upload.array("imageFiles", 6),
  updateMyAccommodation
);

router.delete("/:accommodationId", verifyToken, deleteMyAccommodation);

export default router;
