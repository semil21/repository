import expressAsyncHandler from "express-async-handler";
import SuperAdmin from "../../../schema/super-admin/super-admin/super-admin.schema";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

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
