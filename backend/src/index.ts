import connectDatabase from "./database/database";
import Express from "express";

import cors from "cors";
import dotenv from "dotenv";

import ownerRouter from "./route/admin/admin.route";
import restrauntRouter from "./route/admin/restaurant.route";

import masterCategoryRooter from "./route/super-admin/master-category.route";

connectDatabase();

const app = Express();

dotenv.config();

app.use(cors());
app.use(Express.json());

// super admin routes
app.use("/super-admin/master-category", masterCategoryRooter);

// admin routes
app.use("/owner", ownerRouter);
app.use("/restraunt", restrauntRouter);

app.listen(process.env.PORT_NUMBER, () => console.log("Server running"));
