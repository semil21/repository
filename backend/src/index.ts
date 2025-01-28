import connectDatabase from "./database/database";
import Express, { NextFunction, Request, Response } from "express";

import cors from "cors";
import dotenv from "dotenv";

import adminRouter from "./route/admin/admin.route";
import restaurantRouter from "./route/admin/restaurant.route";

connectDatabase();

const app = Express();

dotenv.config();

app.use(cors());
app.use(Express.json());

// super admin routes

// admin routes
app.use("/admin", adminRouter);
app.use("/restaurant", restaurantRouter);

app.post("/resource", (req: Request, res: Response, next: NextFunction) => {
  res.send("hello");
  next();
});
app.listen(process.env.PORT_NUMBER, () => console.log("Server running"));
