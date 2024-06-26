import axios from "axios"

const getAllProducts = async (page, limit) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/products`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
const getPaginatedProducts = async (page, limit) => {
  try {
    console.log("here")
    const response = await axios.get(`http://localhost:3000/api/products?page=${page}&limit=${limit}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3000/api/products/${id}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
const createProduct = async (inputValues) => {
  try {
    const response = await axios.post("http://localhost:3000/api/products", inputValues)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
const updateProduct = async (inputValues) => {
  try {
    const response = await axios.put(`http://localhost:3000/api/products/${inputValues.id}`, inputValues)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
export default { getAllProducts, getPaginatedProducts, deleteProduct, createProduct, updateProduct }
