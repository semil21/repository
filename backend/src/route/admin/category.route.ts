import express from "express";
import categoryController from "../../controller/admin/category.controller";

const categoryRouter = express.Router();

categoryRouter.post("/create", categoryController.saveNewCategory);
categoryRouter.post(
  "/restaurant-categories/:restaurantId",
  categoryController.getAllCategoryOfARestaurant,
);
categoryRouter.put(
  "/edit-category/:categoryId",
  categoryController.editCategory,
);
categoryRouter.put(
  "/status/:categoryId",
  categoryController.handleCategoryStatus,
);

export default categoryRouter;
