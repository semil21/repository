import express from "express";
import {
  createNewSuperAdmin,
  superAdminLogin,
  countDocumentRecords,
  getAllAdmins,
  getCompleteRestaurantDetails,
} from "../../../controller/super-admin/super-admin/super-admin.controller";
import verifyTokenExists from "../../../middleware/verify-token.middleware";

const superAdminRouter = express.Router();

superAdminRouter.post("/create", createNewSuperAdmin);
superAdminRouter.post("/login", superAdminLogin);
superAdminRouter.get("/count", countDocumentRecords);
superAdminRouter.get("/get-all-admins", verifyTokenExists, getAllAdmins);
superAdminRouter.get(
  "/get-admin-details/:restaurantId",
  verifyTokenExists,
  getCompleteRestaurantDetails,
);

export default superAdminRouter;
