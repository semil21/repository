import express from "express";
import {
  createNewCategory,
  getAllCategoriesOfUser,
  updateCategory,
  updateCategoryStatus,
} from "../../../controller/admin/category/category.controller";
import verifyTokenExists from "../../../middleware/verify-token.middleware";

const categoryRouter = express.Router();

categoryRouter.post("/create", verifyTokenExists, createNewCategory);
categoryRouter.get(
  "/get-categories",
  verifyTokenExists,
  getAllCategoriesOfUser,
);
categoryRouter.put("/update/:categoryId", verifyTokenExists, updateCategory);
categoryRouter.put(
  "/update-status/:categoryId",
  verifyTokenExists,
  updateCategoryStatus,
);

export default categoryRouter;
