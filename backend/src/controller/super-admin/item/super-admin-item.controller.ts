import Item from "../../../schema/admin/item/item.schema";
import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";

export const getAllItems = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const fetchRecords = await Item.find().populate("restaurant");

      if (fetchRecords) {
        res.status(200).send({ response: fetchRecords });
      } else {
        res.status(400).send({ response: "Failed to get all items" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ response: "Server error, failed to get all items" });
    }
  },
);
