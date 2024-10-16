import jwt from "jsonwebtoken";
import { UserModel } from "../models/UserModel.js";

const authMiddleware = async (req, res, next) => {
  const token = req.header("Auth");
  console.log("This is token", token);

  if (!token) return res.status(400).json({ message: "Login first" });

  //decode token
  const token_decode = jwt.verify(token, process.env.JWT_SECRET);
  // console.log(token_decode);

  const id = token_decode.userId;
  //verify honeykey bad us id sey user ko find karna hey
  let user = await UserModel.findById(id);
  if (!user) return res.status(404).json({ message: "User Not Found!" });
  req.user = user;
 
  next();
};

export default authMiddleware;


