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
const ListPropertyRequest_1 = __importDefault(require("../models/ListPropertyRequest"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.post("/", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, mobile, propertyName, propertyLocation, propertyType, rooms, hearAbout, photosLink, propertyDescription, } = req.body;
        const userID = req.userId;
        const listPropertyRequest = new ListPropertyRequest_1.default({
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
        yield listPropertyRequest.save();
        res
            .status(201)
            .json({ message: "List property request submitted successfully" });
    }
    catch (error) {
        console.error("Failed to submit list property request:", error);
        res.status(500).json({ message: "Failed to submit list property request" });
    }
}));
// GET endpoint to fetch all list property requests
router.get("/", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all list property requests from the database
        const listPropertyRequests = yield ListPropertyRequest_1.default.find();
        res.status(200).json(listPropertyRequests);
    }
    catch (error) {
        console.error("Failed to fetch list property requests:", error);
        res.status(500).json({ message: "Failed to fetch list property requests" });
    }
}));
exports.default = router;
