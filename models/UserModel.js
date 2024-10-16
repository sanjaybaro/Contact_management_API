import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  createdAt: { type: Date, default: Date.now },
});

export const UserModel = mongoose.model("User", userSchema);

