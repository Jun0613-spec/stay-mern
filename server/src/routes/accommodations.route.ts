import express from "express";

import {
  searchAccommodations,
  getAccommodations,
  getAccommodationById,
  saveAccommodations,
  getTrendingAccommodations,
  createPaymentIntent,
  createBooking
} from "../controllers/accommodations.controller";

import verifyToken from "../middleware/verify-token";

const router = express.Router();

router.get("/search", searchAccommodations);
router.get("/trending", getTrendingAccommodations);

// Customer account routes
router.get("/", getAccommodations);
router.get("/:accommodationId", getAccommodationById);
router.post("/save/:accommodationId", verifyToken, saveAccommodations);
router.post(
  "/:accommodationId/bookings/payment-intent",
  verifyToken,
  createPaymentIntent
);
router.post("/:accommodationId/bookings", verifyToken, createBooking);

export default router;
