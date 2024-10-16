import express from "express";
import {
  addNewContact,
  deleteContact,
  getAllContact,
  getContactbyId,
  getContactByUserId,
  updateContact,
} from "../controllers/contactController.js";
import authMiddleware from "../middlewares/auth.js";

const contactRouter = express.Router();

//get All contacts
contactRouter.get("/", getAllContact);

//get specific contact by id
contactRouter.get("/:id", getContactbyId);

//add new contact
contactRouter.post("/add", authMiddleware, addNewContact);

//Update contact
contactRouter.put("/:id", authMiddleware, updateContact);

//delete contact
contactRouter.delete("/:id", authMiddleware, deleteContact);

//get contact by userId
contactRouter.get("/userId/:id", getContactByUserId);

export default contactRouter;
