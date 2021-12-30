/* eslint-disable no-underscore-dangle */
const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const bcrypt = require("bcrypt");
const User = require("../models/UserModel");
const Booking = require("../models/BookingModel");
const Flight = require("../models/FlightModel");
const router = express.Router();

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Flight.deleteOne({
      _id: id,
    });

    await Booking.updateMany(
      {
        flights: id,
      },
      { $set: { status: "Cancelled" } }
    );

    res.status = 200;
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ message: "Deleted Successfully" }));
  } catch (e) {
    res.status = 400;
    res.writeHead(400, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ message: "Some Error" }));
  }
});

module.exports = router;
