import { UserModel } from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//user register
export const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  if (name == "" || email == "" || password == "")
    return res.status(400).json({ message: "All fields are required" });

  let saveUser = await UserModel.findOne({ email });
  if (saveUser) return res.json({ message: "User Already exist!" });

  //hasing password
  const hashPass = await bcrypt.hash(password, 10);

  saveUser = await UserModel.create({
    name,
    email,
    password: hashPass,
  });
  res.json({ message: "User Register Successfully...", saveUser });
};

//user login
export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (email == "" || password == "")
    return res.status(400).json({ message: "All fields are required" });

  const user = await UserModel.findOne({ email });
  if (!user) return res.status(404).json({ message: "User Not found" });

  //comparing password
  const validPass = await bcrypt.compare(password, user.password);

  if (!validPass) return res.json({ message: "Invalid Credentials" });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({ message: `Welcome back ${user.name}`, token });
};

//get all user
export const getAllUser = async (req, res) => {
  const userAll = await UserModel.find();
  if (!userAll)
    return res.status(404).json({ message: "No User Found", userAll });
  res.json({ message: "All user fetched!", userAll });
};
