import express from "express";
import {
  getAllTablesOfUser,
  saveNewTable,
  updatetableData,
  updateTableStatus,
} from "../../../controller/admin/table/tablee.controller";
import verifyTokenExists from "../../../middleware/verify-token.middleware";

const tableRouter = express.Router();

tableRouter.post("/create", verifyTokenExists, saveNewTable);
tableRouter.get("/get-all-tables", verifyTokenExists, getAllTablesOfUser);
tableRouter.put("/update/:tableId", verifyTokenExists, updatetableData);
tableRouter.put(
  "/update-status/:tableId",
  verifyTokenExists,
  updateTableStatus,
);

export default tableRouter;
