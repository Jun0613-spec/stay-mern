import { Request, Response } from "express";

import { prisma } from "../lib/prisma";
import { uploadSingleImage } from "../lib/upload-images";

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

export const getSavedAcoommodations = async (
  req: Request,
  res: Response
): Promise<any> => {
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const savedAccommodations = await prisma.save.findMany({
      where: { userId },
      include: {
        accommodation: true
      }
    });

    const accommodations = savedAccommodations.map(
      (save) => save.accommodation
    );

    res.json(accommodations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch saved accommodations" });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<any> => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { firstName, lastName } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) return res.status(400).json({ message: "User not found" });

    let avatarUrl: string | null = null;

    if (req.file) {
      const imageFile = req.file as Express.Multer.File;

      try {
        avatarUrl = await uploadSingleImage(imageFile);
      } catch (imageError) {
        return res.status(500).json({ message: "Failed to upload image" });
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        avatarUrl: avatarUrl || undefined
      }
    });

    res.status(201).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to update user" });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const deleteUser = await prisma.$transaction([
      prisma.save.deleteMany({ where: { userId } }),
      prisma.booking.deleteMany({ where: { userId } }),
      prisma.accommodation.deleteMany({ where: { userId } }),
      prisma.user.delete({ where: { id: userId } })
    ]);

    return res
      .status(200)
      .json({ message: "User deleted successfully", deleteUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to delete user" });
  }
};
