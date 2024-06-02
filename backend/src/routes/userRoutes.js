import express from "express";
import { isAuthorized, isAdmin } from "../middleware/authMiddleware.js"
import { registerController, loginController, logoutController, allUsersController } from "../controllers/userController.js";
const router = express.Router();

router.post("/login", loginController)

router.get("/logout", logoutController)

router.post("/register", registerController)

router.get("/all-users", isAuthorized, isAdmin, allUsersController)


export default router;
