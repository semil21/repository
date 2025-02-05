import express from "express";
import {
  createNewSuperAdmin,
  superAdminLogin,
  countDocumentRecords,
} from "../../../controller/super-admin/super-admin/super-admin.controller";

const superAdminRouter = express.Router();

superAdminRouter.post("/create", createNewSuperAdmin);
superAdminRouter.post("/login", superAdminLogin);
superAdminRouter.post("/count", countDocumentRecords);

export default superAdminRouter;
