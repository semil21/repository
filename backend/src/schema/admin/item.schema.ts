import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  name: {
    type: String,
  },
  price: {
    type: Number,
    default: 0,
  },

  piece: {
    type: Number,
    default: 1,
  },
  quantity: {
    type: String,
    default: 100,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const Item = mongoose.model("Item", itemSchema);

export default Item;
