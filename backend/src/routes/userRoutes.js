import express from "express";
import { registerController, loginController } from "../controllers/userController.js";
const router = express.Router();

router.post("/login", loginController)

router.post("/register", registerController)


export default router;
