import connectDatabase from "./database/database";
import Express from "express";

import cors from "cors";
import dotenv from "dotenv";
import ownerRouter from "./route/admin/admin.route";
import restrauntRouter from "./route/admin/restaurant.route";

connectDatabase();

const app = Express();

dotenv.config();

app.use(cors());
app.use(Express.json());

// admin routes
app.use("/owner", ownerRouter);
app.use("/restraunt", restrauntRouter);

app.listen(process.env.PORT_NUMBER, () => console.log("Server running"));
