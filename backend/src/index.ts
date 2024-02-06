import express, {Request, Response} from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING as string);

const app = express()
const PORT = 7000
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())



app.get('/api/test/', (req:Request, res:Response) => {
  res.json({message: 'hello, server is working'})
})

app.listen(PORT, ()=>{
    console.log(`server running on http://localhost:${PORT}`)
})
