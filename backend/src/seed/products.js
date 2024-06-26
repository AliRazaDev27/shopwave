import mongoose from "mongoose";
import Product from "../models/productModel.js";
import slugify from "slugify";
import Category from "../models/categoryModel.js";
import axios from "axios";
mongoose.connect("mongodb://localhost:27017/shopwave")
async function seedProducts() {
  const result = await axios.get("https://dummyjson.com/products")
  return result.data.products

}
let products = await seedProducts();
seeder(products)
async function seeder(products) {
  let i = 1;
  for (let product of products) {
    const category = await Category.findOne({ name: product.category })
    if (category === null) {
      const newCategory = await Category.create({ name: product.category, slug: slugify(product.category) })
      const newProduct = await Product.create(
        {
          title: product.title,
          description: product.description,
          price: product.price,
          category: newCategory._id,
          user: "60a2c6a9e8f7d9e0b6c6b6c6",
          picture: {
            picture_url: product.images[0],
            public_id: "null"
          }
        })
      console.log(i++)
      i++
    }
    else {
      const newProduct = await Product.create(
        {
          title: product.title,
          description: product.description,
          price: product.price,
          category: category._id,
          user: "60a2c6a9e8f7d9e0b6c6b6c6",
          picture: {
            picture_url: product.images[0],
            public_id: "null"
          }
        })
      console.log(i++)
      i++
    }
  }
}

