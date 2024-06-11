import axios from "axios"


const createCategory = async (inputValues) => {
  try {
    const axiosResponse = await axios
      .post("http://localhost:3000/api/categories",
        inputValues,
        { withCredentials: true, headers: { "ContentType": "application/json" } })

    console.log(axiosResponse.data)
    return axiosResponse.data
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Something went wrong"
    return Promise.reject(errorMessage)
  }
}
const getAllCategories = async () => {
  try {
    const axiosResponse = await axios
      .get("http://localhost:3000/api/categories",
        { withCredentials: true, headers: { "ContentType": "application/json" } })
    return axiosResponse.data
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Something went wrong"
    return Promise.reject(errorMessage)
  }
}
const deleteCategory = async (id) => {
  try {
    const axiosResponse = await axios
      .delete(`http://localhost:3000/api/categories/${id}`,
        { withCredentials: true, headers: { "ContentType": "application/json" } })
    return axiosResponse.data
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Something went wrong"
    return Promise.reject(errorMessage)
  }
}
const updateCategory = async (id, inputValues) => {
  console.log("inside categoryService")
  try {
    const axiosResponse = await axios
      .put(`http://localhost:3000/api/categories/${id}`,
        inputValues,
        { withCredentials: true, headers: { "ContentType": "application/json" } })
    return axiosResponse.data
  } catch (error) {
    console.log("inside error categoryService")
    const errorMessage = error.response?.data?.message || error.message || "Something went wrong"
    return Promise.reject(errorMessage)
  }
}

export default { createCategory, getAllCategories, deleteCategory, updateCategory }
