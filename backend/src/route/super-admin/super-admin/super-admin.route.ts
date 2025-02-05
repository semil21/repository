import express from "express";
import {
  createNewSuperAdmin,
  superAdminLogin,
} from "../../../controller/super-admin/super-admin/super-admin.controller";

const superAdminRouter = express.Router();

superAdminRouter.post("/create", createNewSuperAdmin);
superAdminRouter.post("/login", superAdminLogin);

export default superAdminRouter;
