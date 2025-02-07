import Table from "../../../schema/admin/table/table.schema";
import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Restaurant from "../../../schema/admin/restaurant/restaurant.schema";
import mongoose from "mongoose";

export const saveNewTable = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const saveNewTableRecord = await Table.create(req.body);

      if (saveNewTableRecord) {
        res.status(200).send({ response: saveNewTableRecord });
      } else {
        res.status(400).send({ response: "Failed to save new table" });
      }
    } catch (error) {
      throw error;
    }
  },
);

export const getAllTablesOfUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { user } = req.body;

      const userId = new mongoose.Types.ObjectId(user);
      const getAllTablesAggregationPipeline = [
        {
          $match: {
            user: userId,
          },
        },
        {
          $lookup: {
            from: "tables",
            localField: "_id",
            foreignField: "restaurant",
            as: "tables",
          },
        },
      ];

      const fetchAllTablesData = await Restaurant.aggregate(
        getAllTablesAggregationPipeline,
      );

      if (fetchAllTablesData) {
        res.status(200).send({ response: fetchAllTablesData });
      } else {
        res
          .status(400)
          .send({ response: "Failed to get all tables of a user" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ response: "Server error, failed to get all tables of a user" });
    }
  },
);

export const updatetableData = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { tablleId } = req.params;

      const updateTableRecord = await Table.findByIdAndUpdate(
        { _id: tablleId },
        req.body,
        { new: true },
      );

      if (updateTableRecord) {
        res.status(200).send({ response: updateTableRecord });
      } else {
        res.status(400).send({ response: "Failed to update table" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ response: "Server error, failed to update  table" });
    }
  },
);
