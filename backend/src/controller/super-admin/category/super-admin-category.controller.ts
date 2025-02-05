import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Category from "../../../schema/admin/category/category.schema";

export const fetchAllCategories = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const fetchRecords = await Category.find();

      if (fetchRecords) {
        res.status(200).send({ response: fetchRecords });
      } else {
        res.status(400).end({ response: "Failed to fetch all categories" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ response: "Server error, failed to get all categories" });
    }
  },
);
