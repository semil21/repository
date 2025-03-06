import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Images from "../../../schema/admin/images/images.schema";

export const uploadNewImage = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        res.status(400).send({ response: "Failed to upload image" });
      } else {
        const newImage = await Images.create({ image: req.file.filename });

        if (newImage) {
          res.status(200).send({ response: "Image added successfuly" });
        } else {
          res.status(400).send({ response: "Failed to add new image" });
        }
      }
    } catch (error) {
      console.log("error123", error);
      res.status(500).send({
        response: "server error, failed to upload new image",
        error: error,
      });
    }
  },
);
