import express from "express"
import { userAuth } from "../middlewares/authMiddleware.js";
import { updateUserController } from "../controllers/UserController.js";

const userRouter = express.Router();

userRouter.put('/update-user', userAuth, updateUserController)

export default userRouter;