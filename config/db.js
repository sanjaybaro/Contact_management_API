import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectionDB = async () => {
  await mongoose
    .connect(process.env.mongoURL)
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};

export { connectionDB };
