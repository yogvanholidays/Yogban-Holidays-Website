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
const Rating_1 = __importDefault(require("../models/Rating"));
const router = express_1.default.Router();
// Upload rating or update if already exists
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookingdotcom, airbnb, makemytrip, googleTravel, agoda } = req.body;
        const existingRating = yield Rating_1.default.findOne();
        if (existingRating) {
            // If a rating already exists, update it
            existingRating.bookingdotcom = bookingdotcom;
            existingRating.airbnb = airbnb;
            existingRating.makemytrip = makemytrip;
            existingRating.googleTravel = googleTravel;
            existingRating.agoda = agoda;
            yield existingRating.save();
            res.status(200).send("Rating updated successfully");
        }
        else {
            // If no rating exists, create a new one
            const newRating = new Rating_1.default({
                bookingdotcom,
                airbnb,
                makemytrip,
                googleTravel,
                agoda,
            });
            yield newRating.save();
            res.status(201).send("Rating uploaded successfully");
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// Get rating
router.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingRating = yield Rating_1.default.findOne();
        if (existingRating) {
            res.status(200).json(existingRating);
        }
        else {
            res.status(404).send("Rating not found");
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// Update existing rating
router.put("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookingdotcom, airbnb, makemytrip, googleTravel, agoda } = req.body;
        const existingRating = yield Rating_1.default.findOne();
        if (existingRating) {
            existingRating.bookingdotcom = bookingdotcom;
            existingRating.airbnb = airbnb;
            existingRating.makemytrip = makemytrip;
            existingRating.googleTravel = googleTravel;
            existingRating.agoda = agoda;
            yield existingRating.save();
            res.status(200).send("Rating updated successfully");
        }
        else {
            res.status(404).send("Rating not found");
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.default = router;
