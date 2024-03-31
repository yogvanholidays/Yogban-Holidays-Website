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
const Destination_1 = __importDefault(require("../models/Destination"));
const auth_1 = __importDefault(require("../middleware/auth"));
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
});
router.post("/", auth_1.default, [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name is required"),
    // Add more validation rules as needed
], upload.single("illustrationImage"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let illustrationImageUrl = "";
        if (req.file) {
            // If illustration image is provided, upload it to cloudinary
            const illustrationImage = req.file;
            illustrationImageUrl = yield uploadImage(illustrationImage);
        }
        const newName = req.body.name; // Assuming you pass the name in the request body
        // Create a new Destination object
        const newDestination = new Destination_1.default({
            name: newName,
            illustrationImageUrl: illustrationImageUrl,
            // Add more fields if needed
        });
        // Save the new destination to the database
        yield newDestination.save();
        res.status(201).send(newDestination);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const destinations = yield Destination_1.default.find();
        res.status(200).json(destinations);
    }
    catch (error) {
        console.error("Error fetching destinations:", error);
        res.status(500).json({ message: "Failed to fetch destinations" });
    }
}));
function uploadImage(image) {
    return __awaiter(this, void 0, void 0, function* () {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = yield cloudinary_1.default.v2.uploader.upload(dataURI);
        return res.url;
    });
}
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = req.query;
    try {
        let destinations;
        if (searchTerm) {
            destinations = yield Destination_1.default.find({ name: { $regex: searchTerm, $options: "i" } });
        }
        else {
            destinations = yield Destination_1.default.find();
        }
        res.json(destinations);
    }
    catch (error) {
        console.error("Failed to search destinations:", error);
        res.status(500).json({ message: "Failed to search destinations" });
    }
}));
// Delete destination
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield Destination_1.default.findByIdAndDelete(id);
        res.status(204).end();
    }
    catch (error) {
        console.error("Failed to delete destination:", error);
        res.status(500).json({ message: "Failed to delete destination" });
    }
}));
exports.default = router;
