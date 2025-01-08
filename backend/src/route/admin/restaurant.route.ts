import restaurantController from "../../controller/admin/restaurant.controller";
import express from "express";

const restrauntRouter = express.Router();

restrauntRouter.post("/create", restaurantController.createNewRestaurant);

export default restrauntRouter;
