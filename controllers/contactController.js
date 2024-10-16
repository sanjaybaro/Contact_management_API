import { contactModel } from "../models/ContactModel.js";

//GET ALL CONTACT
export const getAllContact = async (req, res) => {
  const userContact = await contactModel.find();
  if (!userContact)
    return res.status(404).json({ message: "No Contacts Found!", userContact });
  res.status(200).json({ message: "All Contacts Fetched", userContact });
};

//GET SPECIFIC CONTACT
export const getContactbyId = async (req, res) => {
  const id = req.params.id;
  const userContact = await contactModel.findById(id);
  if (!userContact)
    return res.status(404).json({ message: "No Contact Found!", userContact });
  res.status(200).json({ message: "Contact Fetched by id", userContact });
};

//ADD NEW CONTACT
export const addNewContact = async (req, res) => {
  // console.log(req.body);
  const { name, email, phone, type } = req.body; //data req.body pey aeyga frontend sey.
  // res.json(req.body);

  if (name == "" || email == "" || phone == "" || type == "")
    return res.status(400).json({ message: "All fields are required" });

  let saveContact = await contactModel.findOne({ email });
  if (saveContact) return res.json({ message: "User Already exist!" });

  saveContact = await contactModel.create({
    name,
    email,
    phone,
    type,
    user: req.user,
  });
  res.status(201).json({ message: "Contact Saved Successfully", saveContact });
};

//UPDATE CONTACT
export const updateContact = async (req, res) => {
  const id = req.params.id;
  const { name, email, phone, type } = req.body;
  const updateContact = await contactModel.findByIdAndUpdate(
    id,
    {
      name,
      email,
      phone,
      type,
    },
    { new: true }
  );
  if (!updateContact)
    return res.status(404).json({ message: "No Contact Found" });
  res
    .status(200)
    .json({ message: "Contact Updated successfully", updateContact });
};

//DELETE CONTACT
export const deleteContact = async (req, res) => {
  const id = req.params.id;
  const deleteContact = await contactModel.findByIdAndDelete(id);
  if (!deleteContact)
    return res.status(404).json({ message: "Contact not exist!" });
  res
    .status(200)
    .json({ message: "Contact Delete successfully", deleteContact });
};

//GET CONTACT BY USER ID
export const getContactByUserId = async (req, res) => {
  const id = req.params.id;
  let contact = await contactModel.find({ user: id });

  if (!contact) return res.status(404).json({ message: "Contact not Found!" });

  res.json({ message: "User Specific Contact", contact });
};
