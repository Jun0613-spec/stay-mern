import { Request, Response } from "express";

import { uploadImages } from "../lib/upload-images";
import { prisma } from "../lib/prisma";

/* Business account */
export const getMyAccommodations = async (
  req: Request,
  res: Response
): Promise<any> => {
  const userId = req.userId;

  if (!userId) res.status(401).json({ message: "Unauthorized" });

  try {
    const accommodations = await prisma.accommodation.findMany({
      where: { userId: userId }
    });

    res.json(accommodations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch my accommodations" });
  }
};

export const getMyAccommodationById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const userId = req.userId;
  const { accommodationId } = req.params;

  if (!userId) res.status(401).json({ message: "Unauthorized" });

  if (!accommodationId)
    res.status(400).json({ message: "Accommodation ID is required" });

  try {
    const accommodation = await prisma.accommodation.findFirst({
      where: { id: accommodationId, userId: req.userId }
    });

    if (!accommodation)
      res.status(404).json({ message: "Accommodation not found" });

    res.json(accommodation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch my accommodation" });
  }
};

export const createAccommodation = async (
  req: Request,
  res: Response
): Promise<any> => {
  const userId = req.userId;

  if (!userId) res.status(401).json({ message: "Unauthorized" });

  const {
    name,
    city,
    country,
    description,
    type,
    pricePerNight,
    adultCount,
    childCount,
    facilities
  } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) res.status(404).json({ message: "User not found" });

    if (user?.role !== "BUSINESS") {
      res.status(403).json({
        message: "Only business account can add accommodations"
      });
    }

    const imageFiles = req.files as Express.Multer.File[];
    const imageUrls = await uploadImages(imageFiles);

    const newAccommodation = await prisma.accommodation.create({
      data: {
        name,
        city,
        country,
        description,
        type,
        pricePerNight: parseFloat(pricePerNight),
        adultCount: parseInt(adultCount),
        childCount: parseInt(childCount),
        facilities,
        imageUrls,
        lastUpdated: new Date(),
        userId
      }
    });

    res.status(201).json(newAccommodation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to post an accommodation" });
  }
};

export const updateMyAccommodation = async (
  req: Request,
  res: Response
): Promise<any> => {
  const userId = req.userId;
  const { accommodationId } = req.params;

  const {
    name,
    city,
    country,
    description,
    type,
    pricePerNight,
    adultCount,
    childCount,
    facilities
  } = req.body;

  if (!userId) res.status(401).json({ message: "Unauthorized" });

  if (!accommodationId)
    res.status(400).json({ message: "Accommodation ID is required" });

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) res.status(404).json({ message: "User not found" });

    if (user?.role !== "BUSINESS") {
      res
        .status(403)
        .json({ message: "Only business accounts can update accommodations" });
    }

    const imageFiles = req.files as Express.Multer.File[];
    const imageUrls = await uploadImages(imageFiles);

    const updatedAccommodation = await prisma.accommodation.update({
      where: { id: accommodationId, userId: userId },
      data: {
        name,
        city,
        country,
        description,
        type,
        pricePerNight: parseFloat(pricePerNight),
        adultCount: parseInt(adultCount),
        childCount: parseInt(childCount),
        facilities,
        imageUrls,
        lastUpdated: new Date(),
        userId
      }
    });

    res.status(200).json(updatedAccommodation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating accommodation" });
  }
};

export const deleteMyAccommodation = async (
  req: Request,
  res: Response
): Promise<any> => {
  const userId = req.userId;
  const { accommodationId } = req.params;

  if (!userId) res.status(401).json({ message: "Unauthorized" });

  if (!accommodationId)
    res.status(400).json({ message: "Accommodation ID is required" });

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) res.status(404).json({ message: "User not found" });

    if (user?.role !== "BUSINESS") {
      res.status(403).json({
        message: "Only business accounts can delete accommodations"
      });
    }

    const accommodation = await prisma.accommodation.findFirst({
      where: { id: accommodationId, userId: userId }
    });

    if (!accommodation) {
      res.status(404).json({ message: "Accommodation not found" });
    }

    await prisma.save.deleteMany({
      where: { accommodationId: accommodationId }
    });

    await prisma.accommodation.delete({
      where: { id: accommodationId }
    });

    res.status(200).json({ message: "Accommodation deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting accommodation" });
  }
};
