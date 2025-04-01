import express from 'express';
import dotenv from 'dotenv';
dotenv.config()
import userRouter from './routes/userRoutes.js'
import adminRouter from './routes/adminRoutes.js'
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDb from './config/db.js'
import cors from 'cors';
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cookieParser())
app.use(
    cors({
      origin: "http://localhost:3002",
      credentials: true,
    })
  );
connectDb();


app.use('/api',userRouter)
app.use('/api/admin',adminRouter)


console.log('MONGO_URL is:', process.env.MONGO_URI);
app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 5000;
app.listen(port,()=>console.log(`Server started on port ${port}`))