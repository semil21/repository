import expressAsyncHandler from "express-async-handler";
import Restaurant from "../../schema/admin/restaurant.schema";

import { Request, Response, NextFunction } from "express";

const addNewRestaurant = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const saveRecord = await Restaurant.create(req.body);
      res.status(200).send({ response: saveRecord });
      // next();
    } catch (error) {
      res
        .status(500)
        .send({ response: "Server error, failed to create new restaurant" });
    }
  },
);

export default { addNewRestaurant };
