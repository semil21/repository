import express from "express";
import itemController from "../../controller/admin/item.controller";

const itemRouter = express.Router();

itemRouter.post("/create", itemController.addNewItem);
itemRouter.post("/get/:restaurantId", itemController.getAllItemsOfRestaurants);
itemRouter.put("/update-item/:itemId", itemController.updateItem);
itemRouter.put("/update-item-status/:itemId", itemController.updateItemStatus);

export default itemRouter;
