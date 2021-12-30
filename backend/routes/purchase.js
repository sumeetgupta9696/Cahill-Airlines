/* eslint-disable no-underscore-dangle */
const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const bcrypt = require('bcrypt');
const Booking = require('../models/BookingModel');

const router = express.Router();

router.post("/", async (req, res) => {
    const id = req.body.booking;
    const bookingExists = await Booking.findOne({_id: id});

    if (!bookingExists) {
      res.status = 404;
      res.writeHead(404, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify({ message: 'BOOKING_DOESNT_EXISTS' }));
    } else {
        const filter = ({ _id: id });
        const update = {
        seat: req.body.seat,
        };

        bookingExists.seat = req.body.seat;
        await bookingExists.save();

        const b = await Booking.findOne({ _id: id });

        res.status = 200;
        res.writeHead(200, {
            "Content-Type": "application/json",
        });
        res.end(
          JSON.stringify({
            message: "NEW_USER_CREATED",
          })
        );
    }
});

module.exports = router;