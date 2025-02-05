import exprress from "express";
import verifyTokenExists from "../../../middleware/verify-token.middleware";
import { getAllItems } from "../../../controller/super-admin/item/super-admin-item.controller";

const superAdminITemRouter = exprress.Router();

superAdminITemRouter.get("/", verifyTokenExists, getAllItems);

export default superAdminITemRouter;
