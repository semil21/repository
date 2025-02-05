import Restaurant from "../../../schema/admin/restaurant/restaurant.schema";
import expressAsyncHandler from "express-async-handler";
import { Response, Request } from "express";

export const getAllRestaurants = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const fetchRecords = await Restaurant.find();

      if (fetchRecords) [res.status(200).send({ response: fetchRecords })];
      else {
        res.status(400).send("Failed to fetch all restaurants");
      }
    } catch (error) {
      res
        .status(500)
        .send({ response: "Server error, failed to get all restaurants" });
    }
  },
);

export const updateRestaurantStatus = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { restaurantId } = req.params;
      const { status } = req.body;

      const updatedStatus = status === true ? false : true;

      const updateStatus = await Restaurant.findByIdAndUpdate(
        { _id: restaurantId },
        { isApproved: updatedStatus },
        { new: true },
      );

      if (updateStatus) {
        res.status(200).send({ response: updateStatus?.status });
      } else {
        res.status(400).send({
          response:
            "Failed to update restaurant status, please try again later",
        });
      }
    } catch (error) {
      res
        .status(500)
        .send({ response: "Server error, failed to updae restaurant status" });
    }
  },
);
