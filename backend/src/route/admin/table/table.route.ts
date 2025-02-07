import express from "express";
import {
  getAllTablesOfUser,
  saveNewTable,
  updatetableData,
} from "../../../controller/admin/table/tablee.controller";
import verifyTokenExists from "../../../middleware/verify-token.middleware";

const tableRouter = express.Router();

tableRouter.post("/create", verifyTokenExists, saveNewTable);
tableRouter.get("/get-all-tables", verifyTokenExists, getAllTablesOfUser);
tableRouter.put("/update/:tablleId", verifyTokenExists, updatetableData);

export default tableRouter;
