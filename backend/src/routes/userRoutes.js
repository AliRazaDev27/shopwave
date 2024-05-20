import User from "../models/userModel.js";
import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  const result = async () => {
    const users = await User.find();
    res.send(users)
  }
  result();
})
router.get("/:userName", (req, res) => {
  const userName = req.params.userName;
  const result = async () => {
    const users = await User.find({ name: userName });
    res.send(users)
  }
  result();
})
router.post("/add", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await User.create({ name, email, password })
    res.send(newUser)
  } catch (error) {
    if (error != undefined) {
      res.send(error)
    }
    else {
      res.send("unknown error occured")
    }
  }
})


export default router;
