import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();
const verifyTokenExists = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization || "";

    if (!token) {
      res.status(400).send({ response: "No token found" });
    }

    const secretKey = process.env.JWT_SECRET_KEY || "";

    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        res.status(500).send({ response: "Invalid token" });
      }
      req.body.user = decoded;
      next();
    });
  } catch (error) {
    res.status(500).send({ response: "Server Error, failed to verify token" });
  }
};

export default verifyTokenExists;
