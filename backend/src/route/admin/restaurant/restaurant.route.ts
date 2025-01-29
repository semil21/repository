import {
  addNewRestaurant,
  getAllRestaurantsOfUser,
  updateRestaurant,
  updateRestaurantStatus,
} from "../../../controller/admin/restaurant/restaurant.controller";
import express from "express";
import verifyTokenExists from "../../../middleware/verify-token.middleware";

const restaurantRouter = express.Router();

restaurantRouter.post("/create", verifyTokenExists, addNewRestaurant);
restaurantRouter.post("/user", verifyTokenExists, getAllRestaurantsOfUser);
restaurantRouter.put(
  "/update/:restaurantId",
  verifyTokenExists,
  updateRestaurant,
);

restaurantRouter.put(
  "/update-status/:restaurantId",
  verifyTokenExists,
  updateRestaurantStatus,
);

export default restaurantRouter;
