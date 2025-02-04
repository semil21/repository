import { Request, Response } from "express";
import Item from "../../../schema/admin/item/item.schema";
import expressAsyncHandler from "express-async-handler";
import { ObjectId } from "mongoose";
import mongoose from "mongoose";

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
      res.status(500).send({
        response: "Server error, failed to create new item",
      });
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

export const getAllItemsOfUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { user } = req.body;

      const userId = new mongoose.Types.ObjectId(user);

      const aggregationPipeline = [
        {
          $match: {
            user: userId,
          },
        },
        {
          $lookup: {
            from: "restaurants",
            localField: "restaurant",
            foreignField: "_id",
            as: "restaurant_details",
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category_details",
          },
        },
        {
          $unwind: "$restaurant_details",
        },
        {
          $unwind: "$category_details",
        },
        {
          $project: {
            name: 1,
            price: 1,
            quantity: 1,
            status: 1,
            "restaurant_details.name": 1,
            "category_details.name": 1,
          },
        },
      ];

      const fetchAllItemsOfUSer = await Item.aggregate(aggregationPipeline);

      if (fetchAllItemsOfUSer) {
        res.status(200).send({ response: fetchAllItemsOfUSer });
      } else {
        res
          .status(400)
          .send({ response: "Failed to fetch all items of a user." });
      }
    } catch (error) {
      res
        .status(500)
        .send({ response: "Server error, failed to get all iems of user" });
    }
  },
);
