import category from "../models/categoryModel.js";
import slugify from "slugify";
const createCategory = async (req, res) => {
  try {
    const { name } = req.body
    if (!name) {
      return res.status(401).send({ success: false, message: "name is required" })
    }
    const slug = slugify(name)
    const categoryExists = await category.findOne({ slug })
    if (categoryExists) {
      return res.status(401).send({ success: false, message: "category already exists" })
    }
    const newCategory = await category.create({ name, slug })
    res.status(201).send({ success: true, message: "category created successfully", data: newCategory })
  } catch (error) {
    console.log(error)
    res.status(400).send({ success: false, message: error.message })
  }
}

const getAllCategories = async (req, res) => {
  try {
    const categories = await category.find({})
    res.status(200).send({ success: true, message: "all categories found", data: categories })
  } catch (error) {
    res.status(400).send({ success: false, message: error.message })
  }
}
export { createCategory, getAllCategories }
