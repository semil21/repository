import {
  addNewRestaurant,
  getAllRestaurantsOfUser,
} from "../../controller/admin/restaurant.controller";
import express from "express";
import verifyTokenExists from "../../middleware/verify-token.middleware";

const restaurantRouter = express.Router();

restaurantRouter.post("/create", verifyTokenExists, addNewRestaurant);
restaurantRouter.post("/user", verifyTokenExists, getAllRestaurantsOfUser);

export default restaurantRouter;
