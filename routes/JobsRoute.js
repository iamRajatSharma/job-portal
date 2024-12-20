import express from "express"
import { userAuth } from "../middlewares/authMiddleware.js";
import { createJobController, deleteJob, getJobController, jobStatusController, updateJob } from "../controllers/JobController.js";

const jobsRouter = express.Router();

jobsRouter.post("/create-job", userAuth, createJobController)
jobsRouter.get("/get-job", userAuth, getJobController)
jobsRouter.put("/update-job/:id", userAuth, updateJob)
jobsRouter.delete("/delete-job/:id", userAuth, deleteJob)
jobsRouter.get("/job-stat", userAuth, jobStatusController)

export default jobsRouter;