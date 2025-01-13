import mongoose from "mongoose";

const adminCategorySchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  },
});

const AdminCategory = mongoose.model("Category", adminCategorySchema);

export default AdminCategory;
