import express from "express";
import { check } from "express-validator";

import {
  login,
  getValidateTokenUser,
  logout,
  register
} from "../controllers/auth.controller";

import verifyToken from "../middleware/verify-token";

const router = express.Router();

router.post(
  "/register",
  [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with 8 or more characters required").isLength({
      min: 8
    }),
    check("role", "Invalid role").isIn(["BUSINESS", "CUSTOMER"])
  ],

  register
);

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 8 or more characters required").isLength({
      min: 8
    })
  ],
  login
);
router.post("/logout", logout);

router.get("/validate-token", verifyToken, getValidateTokenUser);

export default router;
