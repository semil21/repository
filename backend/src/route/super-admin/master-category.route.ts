import express from "express";
import masterCategoryController from "../../controller/super-admin/master-category.controller";

const masterCategoryRooter = express.Router();

masterCategoryRooter.post(
  "/create",
  masterCategoryController.saveNewMasterCategory,
);
masterCategoryRooter.get("/", masterCategoryController.getAllMAasterCategories);

export default masterCategoryRooter;
