import { Request, Response } from "express";
import Category from "../../../schema/admin/category/category.schema";
import expressAsyncHandler from "express-async-handler";

export const createNewCategory = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const saveNewCategory = await Category.create(req.body);

      if (saveNewCategory) {
        res.status(200).send({ response: saveNewCategory });
      } else {
        res.status(400).send({ response: "Failed to create new category" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ response: "Server error, failed to create new restaurant" });
    }
  },
);

export const getAllCategoriesOfUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const userId = req?.body?.user;
      const fetchAllCategoriesRecord = await Category.find({
        user: userId,
      });

      if (fetchAllCategoriesRecord) {
        res.status(200).send({ response: fetchAllCategoriesRecord });
      } else {
        res
          .status(400)
          .send({ response: "Failed to get all categories of a user" });
      }
    } catch (error) {
      res.status(500).send({
        response: "Server error, failed to get all ctegories of a user",
      });
    }
  },
);

export const updateCategory = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const categoryID = req.params?.categoryId;

      const updateCategoryRecord = await Category.findByIdAndUpdate(
        { _id: categoryID },
        req.body,
        { new: true },
      );

      if (updateCategoryRecord) {
        res.status(200).send({ response: updateCategoryRecord });
      } else {
        res.status(400).send({ response: "Failed to update cateory record" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ response: "Server Error, failed to update category" });
    }
  },
);

export const updateCategoryStatus = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const categoryID = req.params?.categoryId;
      const { status } = req.body;

      const updatedStatus = status == true ? false : true;

      const updateRecordStatus = await Category.findByIdAndUpdate(
        { _id: categoryID },
        { status: updatedStatus },
        { new: true },
      );

      if (updateRecordStatus) {
        res.status(200).send({ response: updateRecordStatus?.status });
      } else {
        res.status(400).send({ response: "Failed to update category status" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ response: "Server error, failed to update category status" });
    }
  },
);
