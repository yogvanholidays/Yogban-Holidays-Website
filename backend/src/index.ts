import express, {Request, Response} from 'express';
import cors from 'cors';
import 'dotenv/config';

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
