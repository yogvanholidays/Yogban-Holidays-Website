import express, { Request, Response } from "express";
import Hotel from "../models/hotel";
import {
  BookingType,
  HotelSearchResponse,
  PaymentIntentResponse,
} from "../shared/types";
import { param, validationResult } from "express-validator";
import Razorpay from "razorpay";
import crypto from "crypto";
import Payment from "../models/Payment";
import booking from "../models/Booking";
import Booking from "../models/Booking";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.get("/search", async (req: Request, res: Response) => {
  try {
    const query = constructSearchQuery(req.query);

    let sortOptions = {};
    switch (req.query.sortOption) {
      case "starRating":
        sortOptions = { starRating: -1 };
        break;
      case "pricePerNightAsc":
        sortOptions = { pricePerNight: 1 };
        break;
      case "pricePerNightDesc":
        sortOptions = { pricePerNight: -1 };
        break;
    }

    const pageSize = 5;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );
    const skip = (pageNumber - 1) * pageSize;

    const hotels = await Hotel.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);

    const total = await Hotel.countDocuments(query);
    const response: HotelSearchResponse = {
      data: hotels,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };
    res.json(response);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const latestHotels = await Hotel.find().sort("-lastUpdated");
    const bestRatedHotels = await Hotel.find().sort("-starRating");
    res.json({ latestHotels: latestHotels, bestRatedHotels: bestRatedHotels });
    // console.log(hotels)
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching hotels" });
  }
});

router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Hotel ID is required")],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id.toString();

    try {
      const hotel = await Hotel.findById(id);
      res.json(hotel);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error fetching hotel" });
    }
  }
);

const constructSearchQuery = (queryParams: any) => {
  let constructedQuery: any = {};

  if (queryParams.destination) {
    constructedQuery.$or = [
      { city: new RegExp(queryParams.destination, "i") },
      { country: new RegExp(queryParams.destination, "i") },
    ];
  }

  if (queryParams.adultCount) {
    constructedQuery.adultCount = {
      $gte: parseInt(queryParams.adultCount),
    };
  }

  if (queryParams.childCount) {
    constructedQuery.childCount = {
      $gte: parseInt(queryParams.childCount),
    };
  }

  if (queryParams.facilities) {
    constructedQuery.facilities = {
      $all: Array.isArray(queryParams.facilities)
        ? queryParams.facilities
        : [queryParams.facilities],
    };
  }
  if (queryParams.amenities) {
    constructedQuery.amenities = {
      $all: Array.isArray(queryParams.amenities)
        ? queryParams.amenities
        : [queryParams.amenities],
    };
  }

  if (queryParams.types) {
    constructedQuery.type = {
      $in: Array.isArray(queryParams.types)
        ? queryParams.types
        : [queryParams.types],
    };
  }

  if (queryParams.stars) {
    const starRatings = Array.isArray(queryParams.stars)
      ? queryParams.stars.map((star: string) => parseInt(star))
      : parseInt(queryParams.stars);

    constructedQuery.starRating = { $in: starRatings };
  }

  if (queryParams.maxPrice) {
    constructedQuery.pricePerNight = {
      $lte: parseInt(queryParams.maxPrice).toString(),
    };
  }

  return constructedQuery;
};

router.post(
  "/:hotelId/bookings/payment-intent",
  async (req: Request, res: Response) => {
    const { hotelId } = req.params;
    const { amount, currency = "INR" } = req.body;
    try {
      // Retrieve the hotel based on the provided hotelId
      const hotel = await Hotel.findById(hotelId);
      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }

      // Initialize Razorpay instance
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID || "",
        key_secret: process.env.RAZORPAY_KEY_SECRET || "",
      });

      const options = {
        amount: amount * 100, // Razorpay requires amount in paisa
        currency: currency,
        receipt: "booking_receipt",
        payment_capture: 1,
      };

      // Create a new payment intent
      razorpay.orders.create(options, (error: any, order: any) => {
        if (error) {
          console.error("Error creating payment intent:", error);
          res.status(500).json({ message: "Error creating payment intent" });
        } else {
          res.json({ order });
        }
      });
      razorpay.payments.all();
    } catch (error) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({ message: "Error creating payment intent" });
    }
  }
);

router.post("/order/validate", async (req, res) => {
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    amount,
    userId,
    firstName,
    lastName,
    email,
    checkIn,
    checkOut,
    adultCount,
    childCount,
    infantCount,
    hotel,
    phoneNumber,
  } = req.body;

  const sha = crypto.createHmac(
    "sha256",
    process.env.RAZORPAY_KEY_SECRET || ""
  );
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");

  if (digest !== razorpay_signature) {
    res.status(400).json({
      message: "Payment Failed",
    });
  } else {
    // Payment validation successful, now save payment details to MongoDB
    try {
      const paymentData: BookingType = {
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        adultCount: adultCount,
        childCount: childCount,
        infantCount: infantCount,
        checkIn: checkIn,
        checkOut: checkOut,
        totalCost: amount,
        razorpay_payment_id,
        razorpay_order_id,
        hotel: hotel,
        phoneNumber: phoneNumber,
      };

      // Save payment details to MongoDB
      const payment = await booking.create(paymentData);

      res.json({
        message: "Payment Successful",
        payment,
      });
      console.log("payment successful");
    } catch (error) {
      console.error("Error saving payment details:", error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
});

router.post("/getUserBookings", verifyToken, async (req, res) => {
  try {
    // Find all bookings for the specified userId
    const bookings = await Booking.find({ userId: req.userId });
    // console.log(bookings);
    res.json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

router.post("/getAllBookings", verifyToken, async (req, res) => {
  try {
    // Find all bookings
    // console.log(req.userId)
    const bookings = await Booking.find();
    res.json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

export default router;
