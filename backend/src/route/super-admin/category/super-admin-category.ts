import express from "express";
import verifyTokenExists from "../../../middleware/verify-token.middleware";
import { fetchAllCategories } from "../../../controller/super-admin/category/super-admin-category.controller";

const superAdminCategoryRouter = express.Router();

superAdminCategoryRouter.get("/", verifyTokenExists, fetchAllCategories);

export default superAdminCategoryRouter;
