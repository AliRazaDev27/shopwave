import express from "express";
import { isAuthorized, isAdmin } from "../middleware/authMiddleware.js"
import { createCategory, getAllCategories } from "../controllers/categoryController.js";
const CategoryRouter = express.Router();

CategoryRouter.post("/", isAuthorized, isAdmin, createCategory)
CategoryRouter.get("/", getAllCategories)
export default CategoryRouter
