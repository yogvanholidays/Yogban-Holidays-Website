import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel from "../models/hotel";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";
import { HotelType } from "../shared/types";
import { platform, reviews, usernames } from "../shared/reviews";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

async function generateRandomReview(reviews: any, usernames: any) {
  const randomReviewIndex = Math.floor(Math.random() * reviews.length);
  const randomReview = reviews[randomReviewIndex];
  const randomUsernameIndex = Math.floor(Math.random() * usernames.length);
  const randomUsername = usernames[randomUsernameIndex];
  const randomPlatform = platform[Math.floor(Math.random()*platform.length)]
  const randomStar =
    Math.random() < 0.1 ? 3 : Math.floor(Math.random() * 3) + 3;
  return {
    review: randomReview,
    name: randomUsername,
    rating: randomStar,
    platform:randomPlatform,
  };
}

async function generateRandomReviews(reviews:any, usernames:any) {
  const numReviews = Math.floor(Math.random() * 3) + 8;
  interface PlatformReviewCounts {
    [key: string]: number;
  }
  
  const platformReviewCounts: PlatformReviewCounts = {
    Google: 0,
    airbnb: 0,
    makemytrip: 0
  };
  

  const randomReviews = [];

  // Calculate how many reviews to generate for each platform
  const reviewsPerPlatform = Math.floor(numReviews / Object.keys(platformReviewCounts).length);

  for (let i = 0; i < numReviews; i++) {
    let platform;
    
    // Determine the platform for the review
    if (platformReviewCounts.Google < reviewsPerPlatform) {
      platform = "Google";
    } else if (platformReviewCounts.airbnb < reviewsPerPlatform) {
      platform = "airbnb";
    } else {
      platform = "makemytrip";
    }

    const review = await generateRandomReview(reviews, usernames);

    // Add the platform to the review
    review.platform = platform;

    randomReviews.push(review);

    // Increment the review count for the platform
    platformReviewCounts[platform]++;
  }

  return randomReviews;
}


router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night is required and must be a number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel = req.body;
      // const reviews = .reviews;
      const imageUrls = await uploadImages(imageFiles);
      const randomReviews = await generateRandomReviews(reviews, usernames);
      newHotel.reviews= randomReviews;
      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;
      // if (reviews) {
      //   newHotel.reviews = reviews;
      // }

      const hotel = new Hotel(newHotel);
      await hotel.save();

      res.status(201).send(hotel);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hotels" });
  }
});

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id.toString();
  try {
    const hotel = await Hotel.findOne({
      _id: id,
      userId: req.userId,
    });
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hotels" });
  }
}); 

router.put(
  "/:hotelId",
  verifyToken,
  upload.array("imageFiles"),
  async (req: Request, res: Response) => {
    try {
      const updatedHotel: HotelType = req.body;
      updatedHotel.lastUpdated = new Date();

      const hotel = await Hotel.findOneAndUpdate(
        {
          _id: req.params.hotelId,
          userId: req.userId,
        },
        updatedHotel,
        { new: true }
      );

      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }

      const files = req.files as Express.Multer.File[];
      const updatedImageUrls = await uploadImages(files);

      hotel.imageUrls = [
        ...updatedImageUrls,
        ...(updatedHotel.imageUrls || []),
      ];

      await hotel.save();
      res.status(201).json(hotel);
    } catch (error) {
      res.status(500).json({ message: "Something went throw" });
    }
  }
);

async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}

router.get("/", async (req, res) => {
  const { searchTerm } = req.query;
  try {
    let hotels;
    // if (searchTerm) {
    //   hotels = await Hotel.find({ name: { $regex: searchTerm, $options: "i" } });
    // } else {
    hotels = await Hotel.find();
    // }
    res.json(hotels);
  } catch (error) {
    console.error("Failed to search hotels:", error);
    res.status(500).json({ message: "Failed to search hotels" });
  }
});

// Delete hotel
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Hotel.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.error("Failed to delete hotel:", error);
    res.status(500).json({ message: "Failed to delete hotel" });
  }
});

export default router;
