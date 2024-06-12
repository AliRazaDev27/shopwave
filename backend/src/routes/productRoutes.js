import express from "express"
import { isAuthorized, isAdmin } from "../middleware/authMiddleware.js"
import upload from "../middleware/fileUploadMiddleware.js"
import { createProduct } from "../controllers/productController.js"

const productRouter = express.Router();

productRouter.post("/", isAuthorized, isAdmin, upload.single('image'), createProduct)


export default productRouter
