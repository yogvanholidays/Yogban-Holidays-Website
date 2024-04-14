import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Destination from "../models/Destination";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    // Add more validation rules as needed
  ],
  upload.single("illustrationImage"),
  async (req: Request, res: Response) => {
    try {
      let illustrationImageUrl = "";
      if (req.file) {
        // If illustration image is provided, upload it to cloudinary
        const illustrationImage = req.file as Express.Multer.File;
        illustrationImageUrl = await uploadImage(illustrationImage);
      }

      const newName: string = req.body.name; // Assuming you pass the name in the request body

      // Create a new Destination object
      const newDestination = new Destination({
        name: newName,
        illustrationImageUrl: illustrationImageUrl,
        // Add more fields if needed
      });

      // Save the new destination to the database
      await newDestination.save();

      res.status(201).send(newDestination);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);




router.get("/", async (req: Request, res: Response) => {
  try {
    const destinations = await Destination.find();
    res.status(200).json(destinations);
  } catch (error) {
    console.error("Error fetching destinations:", error);
    res.status(500).json({ message: "Failed to fetch destinations" });
  }
});


async function uploadImage(image: Express.Multer.File) {
  const b64 = Buffer.from(image.buffer).toString("base64");
  let dataURI = "data:" + image.mimetype + ";base64," + b64;
  const res = await cloudinary.v2.uploader.upload(dataURI);
  return res.url;
}

router.get("/", async (req, res) => {
    const { searchTerm } = req.query;
    try {
      let destinations;
      if (searchTerm) {
        destinations = await Destination.find({ name: { $regex: searchTerm, $options: "i" } });
      } else {
        destinations = await Destination.find();
      }
      res.json(destinations);
    } catch (error) {
      console.error("Failed to search destinations:", error);
      res.status(500).json({ message: "Failed to search destinations" });
    }
  });
  
  // Delete destination
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await Destination.findByIdAndDelete(id);
      res.status(204).end();
    } catch (error) {
      console.error("Failed to delete destination:", error);
      res.status(500).json({ message: "Failed to delete destination" });
    }
  });

export default router;
