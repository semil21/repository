import Table from "../../../schema/admin/table/table.schema";
import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";

export const saveNewTable = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const saveNewTableRecord = await Table.create(req.body);

      if (saveNewTableRecord) {
        res.status(200).send({ response: saveNewTableRecord });
      } else {
        res.status(400).send({ response: "Failed to save new table" });
      }
    } catch (error) {
      throw error;
    }
  },
);
