import express from "express"
import { isAuthorized, isAdmin } from "../middleware/authMiddleware.js"
import upload from "../middleware/fileUploadMiddleware.js"
import { createProduct, getAllProducts, deleteProduct, updateProduct } from "../controllers/productController.js"

const productRouter = express.Router();

productRouter.post("/", upload.single('image'), createProduct)
productRouter.get("/", getAllProducts)
productRouter.delete("/:id", deleteProduct)
productRouter.put("/:id", updateProduct)


export default productRouter
