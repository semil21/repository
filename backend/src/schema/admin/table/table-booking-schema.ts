import mongoose from "mongoose";

const bookTableSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    require: true,
  },
  table: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Table",
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
  timeSlot: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    enum: ["booked", "cancelled"],
  },
});

const Booking = mongoose.model("Booking", bookTableSchema);

export default Booking;
