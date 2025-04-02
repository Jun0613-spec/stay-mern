import express from "express";

import verifyToken from "../middleware/verify-token";

import {
  deleteUser,
  getCurrentUser,
  getSavedAcoommodations,
  updateUser
} from "../controllers/users.controller";

import { upload } from "../config/multer";

const router = express.Router();

router.get("/current-user", verifyToken, getCurrentUser);
router.get("/saved-list", verifyToken, getSavedAcoommodations);
router.put("/", verifyToken, upload.single("avatarUrl"), updateUser);
router.delete("/", verifyToken, deleteUser);

export default router;
