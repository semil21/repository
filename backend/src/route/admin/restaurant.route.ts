import restaurantController from "../../controller/admin/restaurant.controller";
import express from "express";

const restrauntRouter = express.Router();

restrauntRouter.post("/create", restaurantController.createNewRestaurant);
restrauntRouter.post("/:userId", restaurantController.getAllRestaurantOfAOwner);
restrauntRouter.put(
  "/update-restaurant/:restaurantId",
  restaurantController.updateRestaurant,
);

export default restrauntRouter;
