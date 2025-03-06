import { Request, Response } from "express";
import { RRule } from "rrule";
import Booking from "../../../schema/admin/table/table-booking-schema";

const generateTimeSLots = (date: any) => {
  return new RRule({
    freq: RRule.HOURLY,
    dtstart: new Date(date.setHours(0, 0, 0, 0)),
    until: new Date(date.setHours(23, 59, 59, 0)),
    interval: 1,
  });
};

export const checkTableAvailability = async (req: Request, res: Response) => {
  try {
    const { restaurant, table, date, timeSlot } = req.body;

    const formattedDate = new Date(date);
    formattedDate.setUTCHours(0, 0, 0, 0);

    const requestedTime = new Date(`${date}T${timeSlot}:00`);
    const startTime = new Date(requestedTime);
    startTime.setMinutes(0, 0, 0);
    const endTime = new Date(startTime);
    endTime.setMinutes(59, 59, 999);

    const verifyExistingBooking = await Booking.findOne({
      restaurant: restaurant,
      table: table,
      date: formattedDate,
      //   timeSlot,
      timeSlot: {
        $gte: startTime.toISOString().slice(11, 16),
        $lte: endTime.toISOString().slice(11, 16),
      },

      status: "booked",
    });

    if (verifyExistingBooking) {
      res.status(200).send({ response: "Booking already exists" });
    } else {
      const newBooking = await Booking.create({
        user: req.body.user,
        restaurant: restaurant,
        table: table,
        date: formattedDate,
        timeSlot: startTime.toISOString().slice(11, 16),
        status: "booked",
      });
      if (newBooking) {
        res.status(200).send({ response: "Booking done successfully" });
      } else {
        res.status(400).send({ response: "Failed to book table" });
      }
    }
  } catch (error) {
    res.status(500).send({ response: "server error", error: error });
  }
};
