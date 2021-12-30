/* eslint-disable no-underscore-dangle */
const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const bcrypt = require("bcrypt");
const User = require("../models/UserModel");
const Booking = require("../models/BookingModel");
const flight = require("../models/FlightModel");
const router = express.Router();

router.get("/", (req, res) => {
  Booking.find({
    user: req.query.id,
  })
    .populate("user")
    .populate("flights")
    .then((bookings) => {
      res.status = 200;
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(
        JSON.stringify({
          data: bookings,
          message: "BOOKING_LIST",
        })
      );
    })
    .catch((e) => {
      res.status = 400;
      res.writeHead(400, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify({ message: "SYSTEM_ERROR" }));
    });
});

router.get("/cancel", async (req, res) => {
  const id = req.query.id;
  const booking = await Booking.findOne({
    _id: id,
  })
    .populate("flights")
    .populate("user");

  const user = await User.findOne({
    _id: booking.user._id,
  });

  booking.status = "Cancelled";
  user.mileage -= booking.flights.mileage;
  await booking.save();
  await user.save();

  res.status = 200;
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify({ message: "Cancelled Successfully" }));
});

module.exports = router;
