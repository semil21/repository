import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  aadharNumber: {
    type: String,
    require: true,
  },
  contact: {
    type: Number,
    require: true,
  },
  alternateContact: {
    type: Number,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
