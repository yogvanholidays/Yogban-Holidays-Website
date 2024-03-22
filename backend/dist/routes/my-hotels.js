"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const hotel_1 = __importDefault(require("../models/hotel"));
const auth_1 = __importDefault(require("../middleware/auth"));
const express_validator_1 = require("express-validator");
const reviews_1 = require("../shared/reviews");
const router = express_1.default.Router();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
});
function generateRandomReview(reviews, usernames) {
    return __awaiter(this, void 0, void 0, function* () {
        const randomReviewIndex = Math.floor(Math.random() * reviews.length);
        const randomReview = reviews[randomReviewIndex];
        const randomUsernameIndex = Math.floor(Math.random() * usernames.length);
        const randomUsername = usernames[randomUsernameIndex];
        const randomPlatform = reviews_1.platform[Math.floor(Math.random() * reviews_1.platform.length)];
        const randomStar = Math.random() < 0.1 ? 3 : Math.floor(Math.random() * 3) + 3;
        return {
            review: randomReview,
            name: randomUsername,
            rating: randomStar,
            platform: randomPlatform,
        };
    });
}
function generateRandomReviews(reviews, usernames) {
    return __awaiter(this, void 0, void 0, function* () {
        const numReviews = Math.floor(Math.random() * 3) + 8;
        const platformReviewCounts = {
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
            }
            else if (platformReviewCounts.airbnb < reviewsPerPlatform) {
                platform = "airbnb";
            }
            else {
                platform = "makemytrip";
            }
            const review = yield generateRandomReview(reviews, usernames);
            // Add the platform to the review
            review.platform = platform;
            randomReviews.push(review);
            // Increment the review count for the platform
            platformReviewCounts[platform]++;
        }
        return randomReviews;
    });
}
router.post("/", auth_1.default, [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name is required"),
    (0, express_validator_1.body)("city").notEmpty().withMessage("City is required"),
    (0, express_validator_1.body)("country").notEmpty().withMessage("Country is required"),
    (0, express_validator_1.body)("description").notEmpty().withMessage("Description is required"),
    (0, express_validator_1.body)("type").notEmpty().withMessage("Hotel type is required"),
    (0, express_validator_1.body)("pricePerNight")
        .notEmpty()
        .isNumeric()
        .withMessage("Price per night is required and must be a number"),
    (0, express_validator_1.body)("facilities")
        .notEmpty()
        .isArray()
        .withMessage("Facilities are required"),
], upload.array("imageFiles", 6), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imageFiles = req.files;
        const newHotel = req.body;
        // const reviews = .reviews;
        const imageUrls = yield uploadImages(imageFiles);
        const randomReviews = yield generateRandomReviews(reviews_1.reviews, reviews_1.usernames);
        newHotel.reviews = randomReviews;
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;
        // if (reviews) {
        //   newHotel.reviews = reviews;
        // }
        const hotel = new hotel_1.default(newHotel);
        yield hotel.save();
        res.status(201).send(hotel);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong" });
    }
}));
router.get("/", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hotels = yield hotel_1.default.find({ userId: req.userId });
        res.json(hotels);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching hotels" });
    }
}));
router.get("/:id", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id.toString();
    try {
        const hotel = yield hotel_1.default.findOne({
            _id: id,
            userId: req.userId,
        });
        res.json(hotel);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching hotels" });
    }
}));
router.put("/:hotelId", auth_1.default, upload.array("imageFiles"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedHotel = req.body;
        updatedHotel.lastUpdated = new Date();
        const hotel = yield hotel_1.default.findOneAndUpdate({
            _id: req.params.hotelId,
            userId: req.userId,
        }, updatedHotel, { new: true });
        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }
        const files = req.files;
        const updatedImageUrls = yield uploadImages(files);
        hotel.imageUrls = [
            ...updatedImageUrls,
            ...(updatedHotel.imageUrls || []),
        ];
        yield hotel.save();
        res.status(201).json(hotel);
    }
    catch (error) {
        res.status(500).json({ message: "Something went throw" });
    }
}));
function uploadImages(imageFiles) {
    return __awaiter(this, void 0, void 0, function* () {
        const uploadPromises = imageFiles.map((image) => __awaiter(this, void 0, void 0, function* () {
            const b64 = Buffer.from(image.buffer).toString("base64");
            let dataURI = "data:" + image.mimetype + ";base64," + b64;
            const res = yield cloudinary_1.default.v2.uploader.upload(dataURI);
            return res.url;
        }));
        const imageUrls = yield Promise.all(uploadPromises);
        return imageUrls;
    });
}
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = req.query;
    try {
        let hotels;
        // if (searchTerm) {
        //   hotels = await Hotel.find({ name: { $regex: searchTerm, $options: "i" } });
        // } else {
        hotels = yield hotel_1.default.find();
        // }
        res.json(hotels);
    }
    catch (error) {
        console.error("Failed to search hotels:", error);
        res.status(500).json({ message: "Failed to search hotels" });
    }
}));
// Delete hotel
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield hotel_1.default.findByIdAndDelete(id);
        res.status(204).end();
    }
    catch (error) {
        console.error("Failed to delete hotel:", error);
        res.status(500).json({ message: "Failed to delete hotel" });
    }
}));
exports.default = router;
