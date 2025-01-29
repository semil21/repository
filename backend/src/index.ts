import connectDatabase from "./database/database";
import Express, { NextFunction, Request, Response } from "express";

import cors from "cors";
import dotenv from "dotenv";

import adminRouter from "./route/admin/admin/admin.route";
import restaurantRouter from "./route/admin/restaurant/restaurant.route";
import categoryRouter from "./route/admin/category/category.route";

connectDatabase();

const app = Express();

dotenv.config();

app.use(cors());
app.use(Express.json());

// super admin routes

// admin routes
app.use("/admin", adminRouter);
app.use("/restaurant", restaurantRouter);
app.use("/category", categoryRouter);

app.listen(process.env.PORT_NUMBER, () => console.log("Server running"));
