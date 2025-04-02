import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const getMyBookings = async (
  req: Request,
  res: Response
): Promise<any> => {
  const userId = req.userId;

  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    const myBookings = await prisma.booking.findMany({
      where: {
        userId: userId
      },
      include: {
        accommodation: true
      }
    });

    res.status(200).json(myBookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Failed to fetch my bookings" });
  }
};
