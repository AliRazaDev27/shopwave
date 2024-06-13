import fs from "fs"
import product from "../models/productModel.js"
import { uploadImageOnCloudinary } from "../helper/cloudinaryHelper.js"

const createProduct = async (req, res) => {
  console.log("inside controller")
  try {
    const { title, description, price, category, user } = req.body
    const picture = req.file?.path
    if (!title || !description || !price || !category || !user || !picture) {
      return res.status(401).send({ success: false, message: "all fields are required" })
    }
    const result = await uploadImageOnCloudinary(picture, "products")
    const newProduct = await product.create({ title, description, price, category, user, picture: { picture_url: result.secure_url, public_id: result.public_id } })
    res.status(201).send({ success: true, message: "product created successfully", data: newProduct })
  } catch (error) {
    console.log(error)
    res.status(400).send({ success: false, message: error.message })
  }
}
const getAllProducts = async (req, res) => {
  try {
    const products = await product.find({}).populate("category").populate("user")
    res.status(200).send({ success: true, message: "all products found", data: products })
  } catch (error) {
    res.status(400).send({ success: false, message: error.message })
  }
}
const deleteProduct = async (req, res) => {
  try {
    const result = await product.findOneAndDelete({ _id: req.params.id })
    res.status(200).send({ success: true, message: "product deleted successfully" })
    console.log(result)
  } catch (error) {
    res.status(400).send({ success: false, message: error.message })
  }

}
export { createProduct, getAllProducts, deleteProduct }
