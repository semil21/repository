import express from "express";
import {
  getAllRestaurants,
  updateRestaurantStatus,
} from "../../../controller/super-admin/restaurant/super-admin-restaurant.controller";
import verifyTokenExists from "../../../middleware/verify-token.middleware";

const superAdminRestaurantRouter = express.Router();

superAdminRestaurantRouter.get("/", verifyTokenExists, getAllRestaurants);
superAdminRestaurantRouter.put(
  "/update-status/:restaurantId",
  verifyTokenExists,
  updateRestaurantStatus,
);

export default superAdminRestaurantRouter;
