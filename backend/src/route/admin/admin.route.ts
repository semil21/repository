import express from "express";
import {
  createNewAdmin,
  adminLogin,
} from "../../controller/admin/admin.controller";

const adminRouter = express.Router();

adminRouter.post("/create", createNewAdmin);
adminRouter.post("/login", adminLogin);

export default adminRouter;
