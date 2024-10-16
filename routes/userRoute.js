import express from "express";
import {
  getAllUser,
  userLogin,
  userRegister,
} from "../controllers/userController.js";

const userRouter = express.Router();

//get user list
userRouter.get("/", getAllUser);

//user register
userRouter.post("/register", userRegister);

//login user
userRouter.post("/login", userLogin);

export default userRouter;
