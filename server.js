import express from 'express';
import dotenv from 'dotenv';
import connectDB from "./config/db.js"
import router from './routes/index.js';
import morgan from 'morgan';
import authRoute from './routes/AuthRoute.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

dotenv.config();


connectDB();

const app = express();
const PORT = process.env.PORT || 1234;

app.use(express.json())
app.use(morgan('dev'))

app.use("/", router)
app.use("/api/v1/auth", authRoute)

app.use(errorMiddleware)


app.listen(PORT, (err) => {
    if (err) {
        console.log('Server error : ' + err)
    }
    else {
        console.log(`Server started on ${process.env.DEV_MODE} mode on port no ${PORT}`)
    }
})