import express from "express";
import {
  createNewCategory,
  getAllCategoriesOfUser,
} from "../../../controller/admin/category/category.controller";
import verifyTokenExists from "../../../middleware/verify-token.middleware";

const categoryRouter = express.Router();

categoryRouter.post("/create", verifyTokenExists, createNewCategory);
categoryRouter.post("/get", verifyTokenExists, getAllCategoriesOfUser);

export default categoryRouter;
