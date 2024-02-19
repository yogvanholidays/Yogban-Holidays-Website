import express, { Request, Response } from "express";
import Coupon from "../models/Coupon";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.post("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const {
      couponType,
      amount,
      couponCode,
      couponMessage,
      minNights,
      expiryDate,
      neverExpires,
      creationDate,
    } = req.body;

    // Create a new coupon instance
    const newCoupon = new Coupon({
      couponType,
      amount,
      couponCode,
      couponMessage,
      minNights,
      expiryDate,
      neverExpires,
      creationDate,
    });

    // Save the coupon to the database
    await newCoupon.save();

    res.status(201).json({ message: "Coupon created successfully" });
  } catch (error) {
    console.error("Failed to create coupon:", error);
    res.status(500).json({ message: "Failed to create coupon" });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const coupons = await Coupon.find().sort("-creationDate");
    res.status(200).json(coupons);
  } catch (error) {
    console.error("Error fetching coupons:", error);
    res.status(500).json({ message: "Failed to fetch coupons" });
  }
});

export default router;
