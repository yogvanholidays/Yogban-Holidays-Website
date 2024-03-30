import express, { Request, Response } from "express";
import Rating from "../models/Rating";

const router = express.Router();

// Upload rating or update if already exists
router.post("/", async (req: Request, res: Response) => {
  try {
    const { bookingdotcom, airbnb, makemytrip, googleTravel, agoda } = req.body;
    const existingRating = await Rating.findOne();
    if (existingRating) {
      // If a rating already exists, update it
      existingRating.bookingdotcom = bookingdotcom;
      existingRating.airbnb = airbnb;
      existingRating.makemytrip = makemytrip;
      existingRating.googleTravel = googleTravel;
      existingRating.agoda = agoda;
      await existingRating.save();
      res.status(200).send("Rating updated successfully");
    } else {
      // If no rating exists, create a new one
      const newRating = new Rating({
        bookingdotcom,
        airbnb,
        makemytrip,
        googleTravel,
        agoda,
      });
      await newRating.save();
      res.status(201).send("Rating uploaded successfully");
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

// Get rating
router.get("/", async (_req: Request, res: Response) => {
  try {
    const existingRating = await Rating.findOne();
    if (existingRating) {
      res.status(200).json(existingRating);
    } else {
      res.status(404).send("Rating not found");
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

// Update existing rating
router.put("/", async (req: Request, res: Response) => {
  try {
    const { bookingdotcom, airbnb, makemytrip, googleTravel, agoda } = req.body;
    const existingRating = await Rating.findOne();
    if (existingRating) {
      existingRating.bookingdotcom = bookingdotcom;
      existingRating.airbnb = airbnb;
      existingRating.makemytrip = makemytrip;
      existingRating.googleTravel = googleTravel;
      existingRating.agoda = agoda;
      await existingRating.save();
      res.status(200).send("Rating updated successfully");
    } else {
      res.status(404).send("Rating not found");
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

export default router;
