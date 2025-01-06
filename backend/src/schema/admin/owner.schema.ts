import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
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
    type: String,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

export default Restaurant;
