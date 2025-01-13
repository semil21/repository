import expressAsyncHandler from "express-async-handler";
import Item from "../../schema/admin/item.schema";
import { Request, Response } from "express";

const addNewItem = expressAsyncHandler(async (req: Request, res: Response) => {
  try {
    const saveNewItem = await Item.create(req.body);

    if (!saveNewItem) {
      res.status(400).send({ response: "Failed to add new item" });
    } else {
      res.status(200).send({ response: saveNewItem });
    }
  } catch (error) {
    res.status(500).send({ response: "Server error, failed to add new item" });
  }
});

const getAllItemsOfRestaurants = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { restaurantId } = req.params;

      const getRestaurants = await Item.find({
        restaurant: restaurantId,
      });

      if (!getRestaurants) {
        res.status(200).send({ response: "Failed to get all restaurants" });
      } else {
        res.status(200).send({ response: getRestaurants });
      }
    } catch (error) {
      res.status(500).send({
        response: "Server Error, Failed to get all items of restaurant",
        error: error,
      });
    }
  },
);

const updateItem = expressAsyncHandler(async (req: Request, res: Response) => {
  try {
    const { itemId } = req.params;

    const updateItem = await Item.findByIdAndUpdate({ _id: itemId }, req.body, {
      new: true,
    });

    if (!updateItem) {
      res.status(500).send({ response: "Failed to update item" });
    } else {
      res.status(200).send({ response: updateItem });
    }
  } catch (error) {
    res.status(200).send({ response: "Server error, failed to update item" });
  }
});

const updateItemStatus = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { itemId } = req.params;
    const { status } = req.body;
    try {
      const updatedStatus = status === true ? false : true;

      const updateStatus = await Item.findByIdAndUpdate(
        { _id: itemId },
        { status: updatedStatus },
        { new: true },
      );

      if (updateStatus) {
        res.status(200).send({ response: updateStatus });
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

export default {
  addNewItem,
  getAllItemsOfRestaurants,
  updateItem,
  updateItemStatus,
};
