import express from "express"
import { isAuthorized, isAdmin } from "../middleware/authMiddleware.js"
import upload from "../middleware/fileUploadMiddleware.js"
import { createProduct, getAllProducts } from "../controllers/productController.js"

const productRouter = express.Router();

productRouter.post("/", upload.single('image'), createProduct)
productRouter.get("/", getAllProducts)


export default productRouter
