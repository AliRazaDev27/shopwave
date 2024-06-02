import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const isAuthorized = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    console.log("token", token)
    if (!token) {
      return res.status(401).send({ success: false, message: "Please login first" })
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decodedToken.id)
    if (!user) {
      return res.status(401).send({ success: false, message: "Please login first" })
    }
    req.user = user
    next()
  } catch (error) {
    console.log(error)
    return res.status(401).send({ success: false, message: "Please login first" })
  }
}

const isAdmin = (req, res, next) => {
  try {
    if (req.user?.role !== 1) {
      return res.status(401).send({ success: false, message: "You are not the Admin" })
    }
    next()
  } catch (error) {
    console.log(error)
    return res.status(401).send({ success: false, message: error.message })
  }
}
export { isAuthorized, isAdmin }
