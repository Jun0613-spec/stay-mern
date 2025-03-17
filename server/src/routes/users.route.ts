import express from "express";

import verifyToken from "../middleware/verify-token";

import { getCurrentUser } from "../controllers/users.controller";

const router = express.Router();

router.get("/current-user", verifyToken, getCurrentUser);

export default router;
