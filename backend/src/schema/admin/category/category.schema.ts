import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    require: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
