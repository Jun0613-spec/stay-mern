import express from "express";

import {
  googleLogin,
  login,
  logout,
  register
} from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/google", googleLogin);

export default router;
