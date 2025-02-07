import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  },
  number: {
    type: Number,
    require: true,
  },
  capacity: {
    type: Number,
    require: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  isOccupied: {
    type: Boolean,
    default: false,
  },
});

const Table = mongoose.model("Table", tableSchema);

export default Table;
