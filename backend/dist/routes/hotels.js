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
const hotel_1 = __importDefault(require("../models/hotel"));
const express_validator_1 = require("express-validator");
const razorpay_1 = __importDefault(require("razorpay"));
const crypto_1 = __importDefault(require("crypto"));
const Booking_1 = __importDefault(require("../models/Booking"));
const Booking_2 = __importDefault(require("../models/Booking"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.get("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1");
        const skip = (pageNumber - 1) * pageSize;
        const hotels = yield hotel_1.default.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(pageSize);
        const total = yield hotel_1.default.countDocuments(query);
        const response = {
            data: hotels,
            pagination: {
                total,
                page: pageNumber,
                pages: Math.ceil(total / pageSize),
            },
        };
        res.json(response);
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const latestHotels = yield hotel_1.default.find().sort("-lastUpdated");
        const bestRatedHotels = yield hotel_1.default.find().sort("-starRating");
        res.json({ latestHotels: latestHotels, bestRatedHotels: bestRatedHotels });
        // console.log(hotels)
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Error fetching hotels" });
    }
}));
router.get("/:id", [(0, express_validator_1.param)("id").notEmpty().withMessage("Hotel ID is required")], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id.toString();
    try {
        const hotel = yield hotel_1.default.findById(id);
        res.json(hotel);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching hotel" });
    }
}));
const constructSearchQuery = (queryParams) => {
    let constructedQuery = {};
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
            ? queryParams.stars.map((star) => parseInt(star))
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
router.post("/:hotelId/bookings/payment-intent", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { hotelId } = req.params;
    const { amount, currency = "INR" } = req.body;
    try {
        // Retrieve the hotel based on the provided hotelId
        const hotel = yield hotel_1.default.findById(hotelId);
        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }
        // Initialize Razorpay instance
        const razorpay = new razorpay_1.default({
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
        razorpay.orders.create(options, (error, order) => {
            if (error) {
                console.error("Error creating payment intent:", error);
                res.status(500).json({ message: "Error creating payment intent" });
            }
            else {
                res.json({ order });
            }
        });
        razorpay.payments.all();
    }
    catch (error) {
        console.error("Error creating payment intent:", error);
        res.status(500).json({ message: "Error creating payment intent" });
    }
}));
router.post("/order/validate", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, amount, userId, firstName, lastName, email, checkIn, checkOut, adultCount, childCount, hotel, phoneNumber, } = req.body;
    const sha = crypto_1.default.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "");
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");
    if (digest !== razorpay_signature) {
        res.status(400).json({
            message: "Payment Failed",
        });
    }
    else {
        // Payment validation successful, now save payment details to MongoDB
        try {
            const paymentData = {
                userId: userId,
                firstName: firstName,
                lastName: lastName,
                email: email,
                adultCount: adultCount,
                childCount: childCount,
                checkIn: checkIn,
                checkOut: checkOut,
                totalCost: amount,
                razorpay_payment_id,
                razorpay_order_id,
                hotel: hotel,
                phoneNumber: phoneNumber,
            };
            // Save payment details to MongoDB
            const payment = yield Booking_1.default.create(paymentData);
            res.json({
                message: "Payment Successful",
                payment,
            });
            console.log("payment successful");
        }
        catch (error) {
            console.error("Error saving payment details:", error);
            res.status(500).json({
                message: "Internal Server Error",
            });
        }
    }
}));
router.post("/getUserBookings", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find all bookings for the specified userId
        const bookings = yield Booking_2.default.find({ userId: req.userId });
        // console.log(bookings);
        res.json({
            success: true,
            data: bookings,
        });
    }
    catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}));
router.post("/getAllBookings", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find all bookings
        // console.log(req.userId)
        const bookings = yield Booking_2.default.find();
        res.json({
            success: true,
            data: bookings,
        });
    }
    catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}));
exports.default = router;
