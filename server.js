import express from "express";
import { connectionDB } from "./config/db.js";
import contactRouter from "./routes/contactRoute.js";
import userRouter from "./routes/userRoute.js";
import cors from "cors";

// creating express app
const app = express();

//bodyparse middleware
app.use(express.json());
//cors middleware
app.use(cors());

//api enpoints for contact Router
app.use("/api/contact", contactRouter);
//api endpoints for user Router
app.use("/api/user", userRouter);

//database connection
connectionDB();
//creating server
const port = 1000;
app.listen(port, () => {
  console.log(`Server is Runninng on port ${port}`);
});
