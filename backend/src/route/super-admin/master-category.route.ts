import express from "express";
import masterCategoryController from "../../controller/super-admin/master-category.controller";

const masterCategoryRooter = express.Router();

masterCategoryRooter.post(
  "/create",
  masterCategoryController.saveNewMasterCategory,
);
masterCategoryRooter.get("/", masterCategoryController.getAllMasterCategories);
masterCategoryRooter.put(
  "/edit/:categoryId",
  masterCategoryController.editMasterCategory,
);
masterCategoryRooter.put(
  "/update-status/:categoryId",
  masterCategoryController.updateMasterCategoryStatus,
);
masterCategoryRooter.put(
  "/approve/:categoryId",
  masterCategoryController.approveMasterCategory,
);

export default masterCategoryRooter;
