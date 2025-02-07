import express from "express";
import { saveNewTable } from "../../../controller/admin/table/tablee.controller";
import verifyTokenExists from "../../../middleware/verify-token.middleware";

const tableRouter = express.Router();

tableRouter.post("/create", verifyTokenExists, saveNewTable);

export default tableRouter;
