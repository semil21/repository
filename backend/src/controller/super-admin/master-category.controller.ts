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
        res.status(200).send({
          response: "Category Already Exists or It has be inactive for now",
        });
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

const getAllMasterCategories = expressAsyncHandler(
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

const editMasterCategory = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { categoryId } = req.params;
      const { name } = req.body;

      const updateCategoryRecord = await MasterCategory.findByIdAndUpdate(
        { _id: categoryId },
        { name: name },
        { new: true },
      );

      if (updateCategoryRecord) {
        res.status(200).send({ response: "Category updated successfully" });
      } else {
        res.status(400).send({ response: "Failed to update master category" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ response: "Server Error, Failed to edit master category" });
    }
  },
);

const updateMasterCategoryStatus = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { categoryId } = req.params;
      const { status } = req.body;

      const updatedStatus = status === true ? false : true;

      if (updatedStatus) {
        const updateCategoryStatus = await MasterCategory.findByIdAndUpdate(
          { _id: categoryId },
          { status: updatedStatus },
          { new: true },
        );

        if (updateCategoryStatus) {
          res.status(200).send({ response: "Status updated successfully" });
        } else {
          res
            .status(400)
            .send({ response: "Failed to update category status" });
        }
      } else {
        res.status(400).send({ response: "Failed to update category status" });
      }
    } catch (error) {
      res.status(560).send({
        response: "Server error, failed to update master category status",
      });
    }
  },
);

const approveMasterCategory = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { categoryId } = req.params;
      const { approved } = req.body;

      const updatedStatus = approved === true ? false : true;

      const updateApprovalStatus = await MasterCategory.findByIdAndUpdate(
        { _id: categoryId },
        { approved: updatedStatus },
        { new: true },
      );

      if (updateApprovalStatus) {
        res
          .status(200)
          .send({ response: "Category Status approved successfully." });
      } else {
        res.status(400).send({ response: "Failed to update category status" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ response: "Server Error, failed to approve master category" });
    }
  },
);

export default {
  saveNewMasterCategory,
  getAllMasterCategories,
  editMasterCategory,
  updateMasterCategoryStatus,
  approveMasterCategory,
};
