import mongoose from "mongoose";

const authenticateSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    require: true,
  },
  token: {
    type: String,
    require: true,
  },
});

const Authenticate = mongoose.model("Authenticate", authenticateSchema);
export default Authenticate;
