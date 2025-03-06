import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  image: {
    type: String,
  },
});

const Images = mongoose.model("Images", imageSchema);

export default Images;
