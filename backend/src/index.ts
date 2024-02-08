import express, {Request, Response} from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from "mongoose";
import userRoutes from './routes/users'
import authRoutes from './routes/auth'
import cookieParser from "cookie-parser"


mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING as string);

const app = express()
app.use(cookieParser())
const PORT = 7000
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  }));
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)





app.listen(PORT, ()=>{
    console.log(`server running on http://localhost:${PORT}`)
})
