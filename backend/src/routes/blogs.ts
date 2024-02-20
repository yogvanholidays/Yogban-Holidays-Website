import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";
import Blog from "../models/Blog";

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
  // [
  //   body("title").notEmpty().withMessage("title is required"),
  // ],
  upload.single("thumbnailImage"),
  async (req: Request, res: Response) => {
    try {
      const thumbnailImage = req.file as Express.Multer.File;
      const newTitle: string = req.body.title;
      const newContent: string = req.body.content;
      const newAuthor: string = req.body.author;
      const newPublishDate: string = req.body.publishDate;

      // Upload illustration image to cloudinary
      const thumbnailImageUrl = await uploadImage(thumbnailImage);

      const newBlog = new Blog({
        title: newTitle,
        thumbnailImageUrl: thumbnailImageUrl,
        content: newContent,
        author: newAuthor,
        publishDate: newPublishDate,
      });

      // Save the new destination to the database
      await newBlog.save();

      res.status(201).send(newBlog);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);
router.get("/", async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
});
async function uploadImage(image: Express.Multer.File) {
  const b64 = Buffer.from(image.buffer).toString("base64");
  let dataURI = "data:" + image.mimetype + ";base64," + b64;
  const res = await cloudinary.v2.uploader.upload(dataURI);
  return res.url;
}


export default router;
