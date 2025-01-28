import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

interface CustomJwtPayload extends JwtPayload {
  checkEmailExists?: {
    _id?: string;
  };
}
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

      const decodedToken = decoded as CustomJwtPayload;

      const uniqueID = decodedToken.checkEmailExists?._id;
      req.body.user = uniqueID;
      next();
    });
  } catch (error) {
    res.status(500).send({ response: "Server Error, failed to verify token" });
  }
};

export default verifyTokenExists;
