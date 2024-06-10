import axios from "axios"

const loginUser = async (inputValues) => {
  try {
    const axiosResponse = await axios
      .post("http://localhost:3000/api/users/login",
        inputValues,
        { withCredentials: true, headers: { "ContentType": "application/json" } })
    window.localStorage.setItem("user", JSON.stringify(axiosResponse.data))
    return axiosResponse.data
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Something went wrong"
    return Promise.reject(errorMessage)
  }
}

const registerUser = async (inputValues) => {
  try {
    const axiosResponse = await axios
      .post("http://localhost:3000/api/users/register",
        inputValues,
        { withCredentials: true, headers: { "ContentType": "application/json" } })

    return axiosResponse.data
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Something went wrong"
    return Promise.reject(errorMessage)
  }
}

const logoutUser = async () => {
  try {
    const axiosResponse = await axios
      .get("http://localhost:3000/api/users/logout",
        { withCredentials: true, headers: { "ContentType": "application/json" } })
    window.localStorage.removeItem("user")
    return axiosResponse.data
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Something went wrong"
    return Promise.reject(errorMessage)
  }
}
export default { loginUser, registerUser, logoutUser }
