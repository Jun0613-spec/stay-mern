import express from "express";

import verifyToken from "../middleware/verify-token";

import { getMyBookings } from "../controllers/bookings.controller";

const router = express.Router();

router.get("/", verifyToken, getMyBookings);

export default router;
