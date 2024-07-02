import fs from "fs"
import product from "../models/productModel.js"
import { uploadImageOnCloudinary, deleteImageFromCloudinary } from "../helper/cloudinaryHelper.js"

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
    if (req.query.page) {
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 12

      const products = await product.find({}).skip((page - 1) * limit).limit(limit).populate("category").populate("user")
      res.status(200).send({
        success: true, message: "all products found", data:
        {
          products: products,
          currentPage: page,
          numberOfPages: Math.ceil((await product.countDocuments()) / limit)
        }
      })
    }
    else {
      const products = await product.find({}).populate("category").populate("user")
      res.status(200).send({
        success: true, message: "all products found", data: products
      })
    }
  } catch (error) {
    res.status(400).send({ success: false, message: error.message })
  }
}
const deleteProduct = async (req, res) => {
  try {
    const result = await product.findOneAndDelete({ _id: req.params.id })
    const public_id = result.picture.public_id
    await deleteImageFromCloudinary(public_id)
    res.status(200).send({ success: true, message: "product deleted successfully" })
    console.log(result)
  } catch (error) {
    res.status(400).send({ success: false, message: error.message })
  }
}
const updateProduct = async (req, res) => {
  try {
    const id = req.params.id
    let { title, price } = req.body
    const currentProduct = await product.findById(id)
    title = title || currentProduct.title
    price = price || currentProduct.price
    if (!title || !price) {
      return res.status(401).send({ success: false, message: "all fields are required" })
    }
    const updatedProduct = await product.findOneAndUpdate({ _id: id }, { title, price })
    return res.status(200).send({ success: true, message: "product updated successfully" })
  } catch (error) {
    res.status(400).send({ success: false, message: error.message })
  }
}
export { createProduct, getAllProducts, deleteProduct, updateProduct }
