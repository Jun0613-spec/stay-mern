import { Request, Response } from "express";
import Stripe from "stripe";

import { prisma } from "../lib/prisma";
import { constructSearchQuery } from "../lib/utils";
import { Booking } from "../types";

const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

export const searchAccommodations = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const query = constructSearchQuery(req.query);

    let sortOptions: any = {};

    switch (req.query.sortOption) {
      case "pricePerNightAsc":
        sortOptions = { pricePerNight: "asc" };
        break;
      case "pricePerNightDesc":
        sortOptions = { pricePerNight: "desc" };
        break;
      default:
        sortOptions = { name: "asc" };
        break;
    }

    const pageSize = 5;
    const pageNumber = Number(req.query.page) || 1;
    const skip = (pageNumber - 1) * pageSize;

    const accommodations = await prisma.accommodation.findMany({
      where: query,
      orderBy: sortOptions,
      skip,
      take: pageSize,
      include: { bookings: true }
    });

    const total = await prisma.accommodation.count({ where: query });

    const response = {
      data: accommodations,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize)
      }
    };

    res.json(response);
  } catch (error: any) {
    console.error("Search Error:", error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

/* Customer account */
export const getAccommodations = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const accommodations = await prisma.accommodation.findMany({
      orderBy: {
        lastUpdated: "desc"
      }
    });

    res.json(accommodations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch accommodations" });
  }
};

export const getAccommodationById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { accommodationId } = req.params;

  if (!accommodationId)
    res.status(400).json({ message: "Accommodation ID is required" });

  try {
    const accommodation = await prisma.accommodation.findUnique({
      where: { id: accommodationId }
    });

    if (!accommodation) {
      return res.status(404).json({ message: "Accommodation not found" });
    }

    res.json(accommodation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch an accommodation" });
  }
};

export const saveAccommodations = async (
  req: Request,
  res: Response
): Promise<any> => {
  const userId = req.userId;
  const { accommodationId } = req.params;

  if (!userId) res.status(401).json({ message: "Unauthorized" });

  if (!accommodationId)
    res.status(400).json({ message: "Accommodation ID is required" });

  try {
    const result = await prisma.$transaction(async (tx) => {
      const existingAccommodation = await tx.accommodation.findUnique({
        where: { id: accommodationId }
      });

      if (!existingAccommodation) {
        throw new Error("Accommodation not found");
      }

      const existingSave = await tx.save.findUnique({
        where: { userId_accommodationId: { userId, accommodationId } }
      });

      if (existingSave) {
        await tx.save.delete({
          where: { userId_accommodationId: { userId, accommodationId } }
        });

        return {
          message: "Removed from your wishlist"
        };
      } else {
        const savedAccommodation = await tx.save.create({
          data: { userId, accommodationId }
        });

        return {
          message: "Saved to your wishlist",
          savedAccommodation
        };
      }
    });

    return res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(error.message === "Accommodation not found" ? 404 : 500).json({
      message: error.message || "Failed to save accommodation"
    });
  }
};

export const getTrendingAccommodations = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const trendingAccommodations = await prisma.accommodation.aggregateRaw({
      pipeline: [
        {
          $lookup: {
            from: "bookings",
            localField: "_id",
            foreignField: "accommodationId",
            as: "bookings"
          }
        },
        {
          $lookup: {
            from: "saves",
            localField: "_id",
            foreignField: "accommodationId",
            as: "saves"
          }
        },
        {
          $project: {
            name: 1,
            city: 1,
            bookingCount: { $size: "$bookings" },
            saveCount: { $size: "$saves" },
            totalInteractions: {
              $add: [{ $size: "$bookings" }, { $size: "$saves" }]
            }
          }
        },
        { $sort: { totalInteractions: -1 } },
        { $limit: 5 }
      ]
    });

    res.json(trendingAccommodations);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to fetch trending accommodations" });
  }
};

export const createPaymentIntent = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { numberOfNights } = req.body;
  const { accommodationId } = req.params;

  const userId = req.userId;

  if (!userId) res.status(401).json({ message: "Unauthorized" });

  try {
    const accommodation = await prisma.accommodation.findUnique({
      where: { id: accommodationId }
    });

    if (!accommodation) {
      return res.status(400).json({ message: "Accommodation not found" });
    }

    const totalCost = accommodation.pricePerNight * numberOfNights;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCost * 100,
      currency: "gbp",
      metadata: {
        accommodationId: accommodationId,
        userId: userId
      }
    });

    if (!paymentIntent.client_secret) {
      return res.status(500).json({ message: "Error creating payment intent" });
    }

    const response = {
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret!,
      totalCost
    };

    res.send(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating payment intent" });
  }
};

export const createBooking = async (
  req: Request,
  res: Response
): Promise<any> => {
  const {
    paymentIntentId,
    firstName,
    lastName,
    email,
    adultCount,
    childCount,
    checkIn,
    checkOut,
    totalCost
  } = req.body;
  const { accommodationId } = req.params;

  const userId = req.userId;

  if (!userId) res.status(401).json({ message: "Unauthorized" });

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (!paymentIntent) {
      return res.status(400).json({ message: "Payment intent not found" });
    }

    if (
      paymentIntent.metadata.accommodationId !== accommodationId ||
      paymentIntent.metadata.userId !== userId
    ) {
      return res.status(400).json({ message: "Payment intent mismatch" });
    }

    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({
        message: `Payment intent not succeeded. Status: ${paymentIntent.status}`
      });
    }

    const newBooking: Booking = await prisma.booking.create({
      data: {
        firstName,
        lastName,
        email,
        adultCount,
        childCount,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        totalCost,
        userId,
        accommodationId
      }
    });

    const updatedAccommodation = await prisma.accommodation.update({
      where: { id: accommodationId },
      data: {
        bookings: {
          connect: { id: newBooking.id }
        }
      }
    });

    if (!updatedAccommodation) {
      return res.status(400).json({ message: "Accommodation not found" });
    }

    res.status(200).json({ message: "Booking created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating booking" });
  }
};
