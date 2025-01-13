import mongoose from "mongoose";

const masterCategorySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  status: {
    type: Boolean,
    default: false,
  },
  approved: {
    type: Boolean,
    default: false,
  },
});

const MasterCategory = mongoose.model("MasterCategory", masterCategorySchema);

export default MasterCategory;
