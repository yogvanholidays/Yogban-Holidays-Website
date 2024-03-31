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
const Blog_1 = __importDefault(require("../models/Blog"));
const router = express_1.default.Router();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
});
router.post("/", auth_1.default, upload.single("thumbnailImage"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thumbnailImage = req.file;
        const newTitle = req.body.title;
        const newContent = req.body.content;
        const newAuthor = req.body.author;
        const newPublishDate = req.body.publishDate;
        // Upload illustration image to cloudinary
        const thumbnailImageUrl = yield uploadImage(thumbnailImage);
        const newBlog = new Blog_1.default({
            title: newTitle,
            thumbnailImageUrl: thumbnailImageUrl,
            content: newContent,
            author: newAuthor,
            publishDate: newPublishDate,
        });
        // Save the new destination to the database
        yield newBlog.save();
        res.status(201).send(newBlog);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield Blog_1.default.find().sort("-publishDate");
        res.status(200).json(blogs);
    }
    catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).json({ message: "Failed to fetch blogs" });
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
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield Blog_1.default.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json(blog);
    }
    catch (error) {
        console.error("Error fetching blog:", error);
        res.status(500).json({ message: "Failed to fetch blog" });
    }
}));
// Search blogs
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = req.query;
    try {
        let blogs;
        if (searchTerm) {
            blogs = yield Blog_1.default.find({ title: { $regex: searchTerm, $options: "i" } });
        }
        else {
            blogs = yield Blog_1.default.find();
        }
        res.json(blogs);
    }
    catch (error) {
        console.error("Failed to search blogs:", error);
        res.status(500).json({ message: "Failed to search blogs" });
    }
}));
// Delete blog
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield Blog_1.default.findByIdAndDelete(id);
        res.status(204).end();
    }
    catch (error) {
        console.error("Failed to delete blog:", error);
        res.status(500).json({ message: "Failed to delete blog" });
    }
}));
exports.default = router;
