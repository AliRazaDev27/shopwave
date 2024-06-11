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
const deleteCategory = async (req, res) => {
  try {
    const result = await category.findOneAndDelete({ slug: req.params.id })
    res.status(200).send({ success: true, message: "category deleted successfully" })
    console.log(result)
  } catch (error) {
    res.status(400).send({ success: false, message: error.message })
  }
}
const updateCategory = async (req, res) => {
  console.log("inside category controller")
  try {
    const slug = req.params.id
    console.log(req.body)
    const { name } = req.body
    const newSlug = slugify(name)
    if (!slug) {
      return res.status(401).send({ success: false, message: "slug is required" })
    }
    const updatedCategory = await category.findOneAndUpdate({ slug }, { name, slug: newSlug })
    return res.status(200).send({ success: true, message: "category updated successfully" })
  } catch (error) {
    console.log("category controller error")
    res.status(400).send({ success: false, message: error.message })
  }
}
export { createCategory, getAllCategories, deleteCategory, updateCategory }
