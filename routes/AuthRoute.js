import express from "express"
import { LoginController, RegisterController } from "../controllers/AuthController.js";
const authRoute = express.Router();

authRoute.post("/register", RegisterController)
authRoute.post("/login", LoginController)

export default authRoute;