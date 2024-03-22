import express, {Request, Response} from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from "mongoose";
import userRoutes from './routes/users'
import authRoutes from './routes/auth'
import myHotelRoutes from './routes/my-hotels'
import destinations from './routes/destinations'
import hotelRoutes from './routes/hotels'
import properties from './routes/properties'
import coupons from './routes/coupon'
import blogs from './routes/blogs'
import rating from './routes/rating'
import cookieParser from "cookie-parser"
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import carousel from './routes/carousel';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING as string).then(()=>{
  console.log("Connected To MongoDB successfully")
});


const app = express()
app.use(cookieParser())
const PORT = 7000
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  }));
  
  
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));
  
  app.use("/api/auth", authRoutes)
  app.use("/api/users", userRoutes)
  app.use("/api/my-hotels", myHotelRoutes)
  app.use("/api/hotels", hotelRoutes)
  app.use("/api/destinations", destinations)
  app.use("/api/properties", properties)
  app.use("/api/coupons", coupons)
  app.use("/api/blogs", blogs)
  app.use("/api/carousel", carousel)
  app.use("/api/rating", rating)

  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
  });
app.get('/api/test', (req, res) => {
  res.send('GET request to the homepage')
})
app.listen(PORT, ()=>{
    console.log(`server running on http://localhost:${PORT}`)
})
