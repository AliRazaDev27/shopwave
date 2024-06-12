import product from "../models/productModel.js"
import { uploadImageOnCloudinary } from "../helper/cloudinaryHelper.js"

const createProduct = async (req, res) => {
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
export { createProduct }
