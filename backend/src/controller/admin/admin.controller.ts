import Admin from "../../schema/admin/admin.schema";

import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createNewAdmin = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const verifyEmailExists = await Admin.findOne({ email: email });

      if (verifyEmailExists) {
        res.status(400).send({ response: "Ëmail Already Exists" });
      } else {
        const saltRounds = 10;

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        req.body.password = hashedPassword;

        const saveRecord = await Admin.create(req.body);

        if (saveRecord) {
          res.status(200).send({ response: "Admin Created Successfully" });
        } else {
          res.status(400).send({ response: "Failed To Create New Admin" });
        }
      }
    } catch (error) {
      res
        .status(500)
        .send({ response: "Server Error, Failed to create new admin" });
    }
  },
);

export const adminLogin = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const checkEmailExists = await Admin.findOne({ email: email });

      if (!checkEmailExists) {
        throw new Error("Email Does Not Exists");
      }

      const hashedPassword = checkEmailExists?.password ?? "";

      const verifyPassword = await bcrypt.compare(password, hashedPassword);

      if (!verifyPassword) {
        throw new Error("Incorrect password");
      }

      const secretKey = process.env.JWT_SECRET_KEY || "";

      const token = jwt.sign({ checkEmailExists }, secretKey, {
        expiresIn: "5h",
      });

      if (token) {
        res
          .status(200)
          .send({ response: "logged in successfull", token: token });
      } else {
        res.status(400).send({ response: "Failed to log in" });
      }
    } catch (error) {
      throw error;
    }
  },
);
