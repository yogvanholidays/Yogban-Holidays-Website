import express, { Request, Response } from "express";
import ListPropertyRequest from "../models/ListPropertyRequest";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.post("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      mobile,
      propertyName,
      propertyLocation,
      propertyType,
      rooms,
      hearAbout,
      photosLink,
      propertyDescription,
    } = req.body;

    const userID = req.userId;
    const listPropertyRequest = new ListPropertyRequest({
      userID,
      firstName,
      lastName,
      email,
      mobile,
      propertyName,
      propertyLocation,
      propertyType,
      rooms,
      hearAbout,
      photosLink,
      propertyDescription,
    });

    await listPropertyRequest.save();

    res
      .status(201)
      .json({ message: "List property request submitted successfully" });
  } catch (error) {
    console.error("Failed to submit list property request:", error);
    res.status(500).json({ message: "Failed to submit list property request" });
  }
});

// GET endpoint to fetch all list property requests
router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    // Fetch all list property requests from the database
    const listPropertyRequests = await ListPropertyRequest.find();

    res.status(200).json(listPropertyRequests);
  } catch (error) {
    console.error("Failed to fetch list property requests:", error);
    res.status(500).json({ message: "Failed to fetch list property requests" });
  }
});

export default router;
