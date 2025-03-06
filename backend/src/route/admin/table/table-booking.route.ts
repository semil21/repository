import express from "express";
import { checkTableAvailability } from "../../../controller/admin/table/table-booking.controller";

const tableBookingRouter = express.Router();

tableBookingRouter.post("/new-booking", checkTableAvailability);

export default tableBookingRouter;
