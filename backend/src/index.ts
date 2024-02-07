import express, {Request, Response} from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from "mongoose";
import userRoutes from './routes/users'
import authRoutes from './routes/auth'
mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING as string);

const app = express()
const PORT = 7000
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)





app.listen(PORT, ()=>{
    console.log(`server running on http://localhost:${PORT}`)
})
