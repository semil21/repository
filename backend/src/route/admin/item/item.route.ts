import {
  createNewItem,
  updateItem,
  updateItemStatus,
} from "../../../controller/admin/item/item.controller";
import express from "express";
import verifyTokenExists from "../../../middleware/verify-token.middleware";

const itemRouter = express.Router();

itemRouter.post("/create", verifyTokenExists, createNewItem);
itemRouter.put("/update/:itemId", verifyTokenExists, updateItem);
itemRouter.put("/update-status/:itemId", verifyTokenExists, updateItemStatus);

export default itemRouter;
