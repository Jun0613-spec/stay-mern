import { Request, Response } from "express";

import { prisma } from "../lib/prisma";

export const getCurrentUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        avatarUrl: true,
        createdAt: true,
        updatedAt: true,
        role: true,
        bookings: true
      }
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to fetch current user" });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<any> => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) return res.status(400).json({ message: "User not found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to update user" });
  }
};
