import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
async function loginController(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' },
      )
      user.password = undefined
      return res.cookie("token", token, { httpOnly: true, secure: true }).status(200).send({ success: true, message: "login successfull", user })
    } else {
      return res.status(400).send({ success: false, message: "login failed" })
    }
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message })
  }
}
async function logoutController(req, res) {
  try {
    return res.cookie("token", "", { httpOnly: true, secure: true, expires: new Date(0) }).status(200).send({ success: true, message: "logout successfull" })
  }
  catch (error) {
    return res.status(500).send({ success: false, message: error.message })
  }
}
async function registerController(req, res) {
  try {
    const { name, email, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: encryptedPassword })
    return res.status(201).send({ success: true, message: "user created successfully", data: newUser })
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message })
  }
}
async function allUsersController(req, res) {
  try {
    const users = await User.find();
    return res.status(200).send({ success: true, message: "all users", data: users, length: users.length })
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message })
  }
}


export { loginController, logoutController, registerController, allUsersController }
