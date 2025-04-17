import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

import { prisma } from "../lib/prisma";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const client = new OAuth2Client(CLIENT_ID);

export const register = async (req: Request, res: Response): Promise<any> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const { email, password, firstName, lastName, role } = req.body;

  try {
    if (role !== "CUSTOMER" && role !== "BUSINESS") {
      return res.status(400).json({ message: "Invalid role provided" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role
      }
    });

    const token = jwt.sign(
      { userId: newUser.id },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1d" }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 86400000
    });

    return res.status(200).send({
      message: "User has been registered",
      newUser,
      token
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Failed to register" });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (!existingUser)
      return res.status(400).json({ message: "Invalid Credentials" });

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordMatch)
      return res
        .status(400)
        .json({ message: "Incorrect password. check again" });

    const token = jwt.sign(
      { userId: existingUser.id },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1d" }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 86400000
    });

    return res.status(200).json({
      message: `Welcome to stay ${existingUser.firstName}`,
      userId: existingUser.id,
      token
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to login" });
  }
};

export const logout = (req: Request, res: Response): void => {
  res.clearCookie("auth_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  });

  res.status(200).json({ message: "Logged out successfully" });
};

export const googleLogin = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { credential } = req.body;

  if (!credential) {
    return res.status(400).json({ message: "Missing Google credential" });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: CLIENT_ID
    });

    const payload = ticket.getPayload();

    let user = await prisma.user.findUnique({
      where: { email: payload?.email }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: payload?.email!,
          firstName: payload?.given_name!,
          lastName: payload?.family_name!,
          avatarUrl: payload?.picture,
          role: "CUSTOMER",
          password: ""
        }
      });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1d" }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 86400000
    });

    res
      .status(200)
      .json({ success: true, message: "User authenticated", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to login with google" });
  }
};
