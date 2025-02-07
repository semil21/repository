import connectDatabase from "./database/database";
import Express, { NextFunction, Request, Response } from "express";

import cors from "cors";
import dotenv from "dotenv";

import adminRouter from "./route/admin/admin/admin.route";
import restaurantRouter from "./route/admin/restaurant/restaurant.route";
import categoryRouter from "./route/admin/category/category.route";
import itemRouter from "./route/admin/item/item.route";

import superAdminRouter from "./route/super-admin/super-admin/super-admin.route";
import superAdminRestaurantRouter from "./route/super-admin/restaurant/super-admin-restaurant.router";
import superAdminCategoryRouter from "./route/super-admin/category/super-admin-category";
import superAdminITemRouter from "./route/super-admin/item/super-admin-item.route";
import tableRouter from "./route/admin/table/table.route";

connectDatabase();

const app = Express();

dotenv.config();

app.use(cors());
app.use(Express.json());

// super admin routes
app.use("/super-admin", superAdminRouter);
app.use("/super-admin/restaurant", superAdminRestaurantRouter);
app.use("/super-admin/category", superAdminCategoryRouter);
app.use("/super-admin/item", superAdminITemRouter);

// admin routes
app.use("/admin", adminRouter);
app.use("/restaurant", restaurantRouter);
app.use("/category", categoryRouter);
app.use("/item", itemRouter);
app.use("/table", tableRouter);

app.listen(process.env.PORT_NUMBER, () => console.log("Server running"));
