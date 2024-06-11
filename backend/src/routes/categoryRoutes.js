import express from "express";
import { isAuthorized, isAdmin } from "../middleware/authMiddleware.js"
import { createCategory, getAllCategories, deleteCategory, updateCategory } from "../controllers/categoryController.js";
const CategoryRouter = express.Router();

CategoryRouter.post("/", isAuthorized, isAdmin, createCategory)
CategoryRouter.get("/", getAllCategories)
CategoryRouter.delete("/:id", deleteCategory)
CategoryRouter.put("/:id", updateCategory)

export default CategoryRouter
