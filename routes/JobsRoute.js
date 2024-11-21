import express from "express"
import { userAuth } from "../middlewares/authMiddleware.js";
import { createJobController } from "../controllers/JobController.js";
const jobsRouter = express.Router();

jobsRouter.post("/create-job", userAuth, createJobController)

export default jobsRouter;