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

export default { createNewRestaurant };
