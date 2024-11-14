import express from 'express';
import dotenv from 'dotenv';
import connectDB from "./config/db.js"


dotenv.config();

connectDB();
const app = express();
const PORT = process.env.PORT || 1234;


app.get("/", (req, res) => {
    return res.send({ message: "Hello" })
})

app.listen(PORT, (err) => {
    if (err) {
        console.log('Server error : ' + err)
    }
    else {
        console.log(`Server started on ${process.env.DEV_MODE} mode on port no ${PORT}`)
    }
})