import expressAsyncHandler from "express-async-handler";
import Restaurant from "../../schema/admin/restaurant.schema";

import { Request, Response } from "express";

export const addNewRestaurant = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const saveRecord = await Restaurant.create(req.body);

      if (saveRecord) {
        res.status(200).send({
          response: saveRecord,
        });
      } else {
        res.status(400).send({ response: "Failed to create new restaurant" });
      }
    } catch (error) {
      res.status(500).send({
        response: "Server error, failed to create new restaurant",
        error: error,
      });
    }
  },
);

export const getAllRestaurantsOfUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const userId = req.body?.user;
      const fetchAllRestaurantsRecord = await Restaurant.find({ user: userId });

      if (fetchAllRestaurantsRecord) {
        res.status(200).send({ response: fetchAllRestaurantsRecord });
      } else {
        res
          .status(400)
          .send({ response: "Failed to get all restaurnts of users" });
      }
    } catch (error) {
      res.status(500).send({
        response: "Server error, failed to get all restaurants of a user",
      });
    }
  },
);

export const updateRestaurant = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const restaurantID = req.params?.restaurantId;

      const updateRecord = await Restaurant.findByIdAndUpdate(
        { _id: restaurantID },
        req.body,
        { new: true },
      );

      if (updateRecord) {
        res.status(200).send({ response: updateRecord });
      } else {
        res.status(400).send({ response: "Failed to update restaurnt record" });
      }

      res.status(200).send({ response: updateRecord });
    } catch (error) {
      res
        .status(500)
        .send({ response: "Server Error, failed to update restaurant" });
    }
  },
);

export const updateRestaurantStatus = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const restaurantID = req?.params?.restaurantId;
      const { status } = req.body;

      const updatedStatus = status === true ? false : true;

      const updateRecordStatus = await Restaurant.findByIdAndUpdate(
        { _id: restaurantID },
        { status: updatedStatus },
        { new: true },
      );

      if (updateRecordStatus) {
        res.status(200).send({ response: updateRecordStatus?.status });
      } else {
        res
          .status(400)
          .send({ response: "Failed to update restaurant status" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ response: "Server error, failed to update restaurnt status" });
    }
  },
);
