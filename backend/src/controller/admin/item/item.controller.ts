import { Request, Response } from "express";
import Item from "../../../schema/admin/item/item.schema";
import expressAsyncHandler from "express-async-handler";

export const createNewItem = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const saveNewRecord = await Item.create(req.body);

      if (saveNewRecord) {
        res.status(200).send({ response: saveNewRecord });
      } else {
        res.status(400).send({ response: "Failed to save new item" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ response: "Server error, failed to create new item" });
    }
  },
);

export const updateItem = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const itemID = req.params?.itemId;

      const updateRecord = await Item.findByIdAndUpdate(
        { _id: itemID },
        req.body,
        { new: true },
      );

      if (updateRecord) {
        res.status(200).send({ response: updateRecord });
      } else {
        res.status(400).send({ response: "Failed to update item record" });
      }
    } catch (error) {
      res.status(500).send({ response: "Server error, failed to update item" });
    }
  },
);

export const updateItemStatus = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const itemID = req.params?.itemId;
      const { status } = req.body;

      const updatedStatus = status === true ? false : true;

      const updatStatus = await Item.findByIdAndUpdate(
        { _id: itemID },
        { status: updatedStatus },
        { new: true },
      );

      if (updatStatus) {
        res.status(200).send({ response: updatStatus });
      } else {
        res.status(400).send({ response: "Failed to update item status" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ response: "Server error, failed to update item status" });
    }
  },
);
