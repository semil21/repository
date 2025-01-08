import { Request, Response } from "express";
import Restaurant from "../../schema/admin/restaurant.schema";

import expressAsyncHandler from "express-async-handler";

const createNewRestaurant = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const saveRestaurant = await Restaurant.create(req.body);

      if (saveRestaurant) {
        res
          .status(200)
          .send({ response: "New Restaurant Created Successfully" });
      } else {
        res.status(400).send({ response: "Failed to Create New Restaurant" });
      }
    } catch (error) {
      res.status(500).send({
        response: "Server Error, Failed to Create New Restaurant",
        error: error,
      });
    }
  },
);

const getAllRestaurantOfAOwner = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const userId = req.params?.userId;

      const fetchAllRecords = await Restaurant.find({ user: userId });

      if (fetchAllRecords) {
        res.status(200).send({ response: fetchAllRecords });
      } else {
        res
          .status(500)
          .send({ response: "Failed to get all restaurant of a owner" });
      }
    } catch (error) {
      res.status(500).end({
        response: "Server Error, Failed to get all restaurant of a owner",
      });
    }
  },
);

const updateRestaurant = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { restaurantId } = req.params;

      const updateRecord = await Restaurant.findByIdAndUpdate(
        { _id: restaurantId },
        req.body,
        { new: true },
      );

      if (updateRecord) {
        res.status(200).send({ response: "Restaurant Updated Successfully" });
      } else
        [res.status(200).send({ response: "Failed to update restaurant" })];
    } catch (error) {
      res
        .status(500)
        .send({ response: "Server Error, Failed to Update Restaurant" });
    }
  },
);

export default {
  createNewRestaurant,
  getAllRestaurantOfAOwner,
  updateRestaurant,
};
