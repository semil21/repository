import expressAsyncHandler from "express-async-handler";
import MasterCategory from "../../schema/super--admin/master-schema/master-category.schema";
import { Request, Response } from "express";

const saveNewMasterCategory = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { name } = req.body;

      const checkCategoryExists = await MasterCategory.findOne({
        name: name,
      });

      if (checkCategoryExists) {
        res.status(200).send({ response: "Category Already Exists" });
      } else {
        const saveData = await MasterCategory.create(req.body);

        if (saveData) {
          res.status(200).send({ response: saveData });
        } else {
          res
            .status(400)
            .send({ response: "Failed to sve new master category" });
        }
      }
    } catch (error) {
      res
        .status(200)
        .send({ response: "Server Error, faied to add new master category" });
    }
  },
);

const getAllMAasterCategories = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const allMasterCategories = await MasterCategory.find();

      if (allMasterCategories) {
        res.status(200).send({ response: allMasterCategories });
      } else {
        res
          .status(400)
          .send({ response: "Failed to get all master categories" });
      }
    } catch (error) {
      res.status(500).send({
        response: "Server Error, failed to gett all master categories",
      });
    }
  },
);

export default { saveNewMasterCategory, getAllMAasterCategories };
