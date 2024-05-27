import axios from "axios"

const loginUser = async (inputValues) => {
  const axiosResponse = axios
    .post("http://localhost:3000/api/users/login",
      inputValues,
      { withCredentials: true, headers: { "ContentType": "application/json" } })
    .then((res) => {
      window.localStorage.setItem("user", JSON.stringify(res.data))
      return res.data

    })
    .catch((err) => {
      return err.response.data
    });
  return axiosResponse
}

export default { loginUser }
