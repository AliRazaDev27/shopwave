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
const getProduct = async (req, res) => {
  try {
    const _product = await product.findById(req.params.id).populate("category").populate("user")
    res.status(200).send({ success: true, message: "product found", data: _product })
  } catch (error) {
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
    console.log(id)
    console.log(req.body)
    console.log(req.file)
    let { title, description, price, category, user, picture } = req.body
    if (picture.public_id !== "null") {
      await deleteImageFromCloudinary(picture.public_id)
    }
    if (req.file) {
      const result = await uploadImageOnCloudinary(req.file?.path, "products")
      const updatedProduct = await product.findByIdAndUpdate(id, { title, description, price, category, user, picture: { picture_url: result.secure_url, public_id: result.public_id } })
    }
    else {
      const updatedProduct = await product.findByIdAndUpdate(id, { title, description, price, category: category._id, user })
    }

    return res.status(200).send({ success: true, message: "product updated successfully" })
  } catch (error) {
    res.status(400).send({ success: false, message: error.message })
  }
}
export { createProduct, getProduct, getAllProducts, deleteProduct, updateProduct }
