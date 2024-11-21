import express from "express"
import { userAuth } from "../middlewares/authMiddleware.js";
import { createJobController, getJobController } from "../controllers/JobController.js";
const jobsRouter = express.Router();

jobsRouter.post("/create-job", userAuth, createJobController)
jobsRouter.get("/get-job", userAuth, getJobController)

export default jobsRouter;