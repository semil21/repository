import mongoose from "mongoose";

const superAdminSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

const SuperAdmin = mongoose.model("SuperAdmin", superAdminSchema);

export default SuperAdmin;
