import express from "express";
import { uploadNewImage } from "../../../controller/admin/image/image.controller";
import { multerUploadImage } from "../../../middleware/multer";

const uploadIMageRouter = express.Router();

uploadIMageRouter.post("/upload-image", multerUploadImage, uploadNewImage);

export default uploadIMageRouter;
