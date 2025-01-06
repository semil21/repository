import Restaurant from "../../schema/admin/owner.schema";
import Authenticate from "../../schema/admin/authenticate";

import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import str from "@supercharge/strings";
import nodemailer from "nodemailer";

const createNewAdmin = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const verifyEmailExists = await Restaurant.findOne({ email: email });

      if (verifyEmailExists) {
        res.status(400).send({ response: "Ëmail Already Exists" });
      } else {
        const saltRounds = 10;

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        req.body.password = hashedPassword;

        const saveRecord = await Restaurant.create(req.body);

        if (saveRecord) {
          res.status(200).send({ response: "Owner Created Successfully" });
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

const adminLogin = expressAsyncHandler(async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const findEmail = await Restaurant.findOne({ email: email });

    if (!findEmail) {
      res.status(400).send({ response: "No Email Found" });
    } else {
      const hashedPassword = findEmail?.password ?? "";

      const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

      if (!isPasswordCorrect) {
        res.status(400).send({ response: "Incorrect Password, Try Again" });
      } else {
        const randomToken = str.random();

        const verifyTokenExists = await Authenticate.findOne({
          user: findEmail?._id,
        });

        if (verifyTokenExists) {
          await Authenticate.deleteOne({ user: findEmail?._id });
        }
        await Authenticate.create({ user: findEmail?._id, token: randomToken });

        if (isPasswordCorrect && randomToken) {
          res.status(200).send({
            response: "Logged in successfully",
            token: randomToken,
            userId: findEmail?._id,
          });
        } else {
          res.status(400).send({ response: "Failed to log in" });
        }
      }
    }
  } catch (error) {
    res.status(500).send({ response: "Server Error, Failed To Log In." });
  }
});

const passwordReset = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      const verifyEmail = await Restaurant.findOne({ email: email });

      if (!verifyEmail) {
        res.status(400).send({ response: "No Email Found" });
      } else {
        const OTP = Math.random().toString().substring(3, 7);

        const verifyAdminExists = await Authenticate.findOne({
          user: verifyEmail?._id,
        });

        if (verifyAdminExists) {
          await Authenticate.findOneAndUpdate(
            { user: verifyEmail?._id },
            { token: OTP },
            { new: true },
          );
        } else {
          await Authenticate.create({ user: verifyEmail?._id, token: OTP });
        }

        if (OTP) {
          const transporter = nodemailer.createTransport({
            service: process.env.MAIL_SERVICE,
            auth: {
              user: process.env.ADMIN_MAIL,
              pass: process.env.ADMIN_PASS,
            },
          });

          const mailOptions = {
            from: process.env.ADMIN_MAIL,
            to: email,
            subject: "OTP for Password Reset ",
            text: "Your OTP is " + OTP,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });

          res.status(200).send({ response: "OTP Sent Successfully" });
        }
      }
    } catch (error) {
      res
        .status(500)
        .send({ response: "Server Error, Failed to Update Password" });
    }
  },
);

export default { createNewAdmin, adminLogin, passwordReset };
