import expressAsyncHandler from "express-async-handler";
import SuperAdmin from "../../../schema/super-admin/super-admin/super-admin.schema";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import Admin from "../../../schema/admin/admin/admin.schema";
import Category from "../../../schema/admin/category/category.schema";
import Item from "../../../schema/admin/item/item.schema";
import Restaurant from "../../../schema/admin/restaurant/restaurant.schema";

dotenv.config();

export const createNewSuperAdmin = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { password } = req.body;
      const saltRounds = 15;

      const hashedPassword = await bcrypt.hash(password, saltRounds);

      req.body.password = hashedPassword;

      const saveRecord = await SuperAdmin.create(req.body);

      if (saveRecord) {
        res.status(200).send({ response: "New admin created successfully" });
      } else {
        res.status(400).send({ response: "Failed to save new admin" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ response: "Server error, failed to create new admin" });
    }
  },
);

export const superAdminLogin = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const verifyEmail = await SuperAdmin.findOne({ email: email });

      if (!verifyEmail) {
        res.status(400).send({ response: "No Email Found" });
      } else {
        const verifyHashedPasword = await bcrypt.compare(
          password,
          verifyEmail.password ?? "",
        );

        if (!verifyHashedPasword) {
          res.status(400).send({ response: "Incorrect password" });
        } else {
          const secrectKey = process.env.JWT_SECRET_KEY || "";

          const token = jwt.sign({ verifyEmail }, secrectKey, {
            expiresIn: "5h",
          });

          if (token) {
            res
              .status(200)
              .send({ response: "Logged in succesfully.", token: token });
          }
        }
      }
    } catch (error) {
      res.status(500).send({ response: "Server error, failed to log in" });
    }
  },
);

export const countDocumentRecords = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const [adminsCount, categoriesCount, itemsCount, restaurantsCount] =
        await Promise.all([
          Admin.countDocuments(),
          Category.countDocuments(),
          Item.countDocuments(),
          Restaurant.countDocuments(),
        ]);

      if (adminsCount && categoriesCount && itemsCount && restaurantsCount) {
        res.status(200).send({
          response: {
            adminsCount,
            categoriesCount,
            itemsCount,
            restaurantsCount,
          },
        });
      } else {
        res.status(400).send({ response: "Failed to get count of records" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ response: "Server error, failed to get count of records" });
    }
  },
);

export const getAllAdmins = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const fetchRecords = await Admin.find();

      if (fetchRecords) {
        res.status(200).send({ response: fetchRecords });
      } else {
        res.status(400).send({ response: "Failed to fetch all admin records" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ response: "Server error, failed to get all admin details" });
    }
  },
);

export const getCompleteRestaurantDetails = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const aggregationPipeline = [
        {
          $lookup: {
            from: "items",
            localField: "_id",
            foreignField: "category",
            as: "items",
          },
        },
      ];

      const aggregatedResult = await Category.aggregate(aggregationPipeline);

      if (aggregatedResult) {
        res.status(200).send({
          textResponse: "Data fetched successfully.",
          response: aggregatedResult,
        });
      } else {
        res.status(400).send({ response: "Failed to fetch all admin details" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ response: "Server error, failed to get all admin details" });
    }
  },
);
