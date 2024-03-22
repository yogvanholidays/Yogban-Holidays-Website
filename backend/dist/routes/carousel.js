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
const auth_1 = __importDefault(require("../middleware/auth"));
const CarouselImage_1 = __importDefault(require("../models/CarouselImage"));
const router = express_1.default.Router();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
});
// Upload carousel image
router.post("/", auth_1.default, upload.single("carouselImage"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carouselImage = req.file;
        const featuredText = req.body.featuredText;
        const ButtonLink = req.body.ButtonLink;
        // Upload image to cloudinary
        const imageUrl = yield uploadImage(carouselImage);
        const newCarouselImage = new CarouselImage_1.default({
            imageUrl: imageUrl,
            featuredText: featuredText,
            ButtonLink: ButtonLink,
        });
        // Save the new carousel image to the database
        yield newCarouselImage.save();
        res.status(201).send(newCarouselImage);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}));
// Fetch all carousel images
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carouselImages = yield CarouselImage_1.default.find();
        res.status(200).json(carouselImages);
    }
    catch (error) {
        console.error("Error fetching carousel images:", error);
        res.status(500).json({ message: "Failed to fetch carousel images" });
    }
}));
// Delete carousel image
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield CarouselImage_1.default.findByIdAndDelete(id);
        res.status(204).end();
    }
    catch (error) {
        console.error("Failed to delete carousel image:", error);
        res.status(500).json({ message: "Failed to delete carousel image" });
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
exports.default = router;
