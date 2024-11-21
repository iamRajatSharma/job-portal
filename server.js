import express from 'express';
import dotenv from 'dotenv';
import connectDB from "./config/db.js"
import morgan from 'morgan';
import authRoute from './routes/AuthRoute.js';
import userRouter from './routes/UserRoute.js';
import jobsRouter from './routes/JobsRoute.js';
import { userAuth } from './middlewares/authMiddleware.js';

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 1234;

app.use(express.json())
app.use(morgan('dev'))

app.get("/", userAuth, (req, res) => {
    console.log(1)
    return res.send({ message: "Welcome" })
})

app.use("/api/v1/auth", authRoute)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/job", jobsRouter)

// app.use(errorMiddleware)

app.listen(PORT, (err) => {
    if (err) {
        console.log('Server error : ' + err)
    }
    else {
        console.log(`Server started on ${process.env.DEV_MODE} mode on port no ${PORT}`)
    }
})