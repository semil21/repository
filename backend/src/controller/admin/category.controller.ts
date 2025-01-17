import { Request, Response } from "express";
import Category from "../../schema/admin/category";
import expressAsyncHandler from "express-async-handler";

const saveNewCategory = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const saveRecord = await Category.create(req.body);

      if (saveRecord) {
        res.status(200).send({ response: saveRecord });
      } else {
        res.status(400).send({ response: "Failed to Create New Category" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ response: "Server Error, Failed to Create New Category" });
    }
  },
);

const getAllCategoryOfARestaurant = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { restaurantId } = req.params;

      const getRestaurants = await Category.find({ restaurant: restaurantId });

      if (getRestaurants) {
        res.status(200).send({ response: getRestaurants });
      } else {
        res.status(404).send({ response: "Failed to Get All Categories" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ response: "Server Error, Failed to Get All Category" });
    }
  },
);

const editCategory = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { categoryId } = req.params;

      if (!categoryId) {
        res.status(400).send({ response: "Category Id Not Found" });
      } else {
        const editCategoryRecord = await Category.findByIdAndUpdate(
          { _id: categoryId },
          req.body,
          { new: true },
        );

        if (editCategoryRecord) {
          res.status(200).send({ response: editCategoryRecord });
        } else {
          res.status(400).send({ response: "Failed to Edit Category" });
        }
      }
    } catch (error) {
      res
        .status(500)
        .send({ response: "Server Error, Failed to Edit Category" });
    }
  },
);

const handleCategoryStatus = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { categoryId } = req.params;
      const { status } = req.body;

      const updatedStatus = status === true ? false : true;

      const updateCategoryStatus = await Category.findOneAndUpdate(
        { _id: categoryId },
        { status: updatedStatus },
        { new: true },
      );
      if (updateCategoryStatus) {
        res.status(200).send({ response: updateCategoryStatus?.status });
      } else {
        res.status(400).send({ response: "Failed to update status " });
      }
    } catch (error) {
      res
        .status(500)
        .send({ response: "Server Error, Failed to Update Status" });
    }
  },
);

export default {
  saveNewCategory,
  getAllCategoryOfARestaurant,
  editCategory,
  handleCategoryStatus,
};
