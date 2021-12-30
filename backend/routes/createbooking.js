/* eslint-disable no-underscore-dangle */
const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const bcrypt = require("bcrypt");
const user = require("../models/UserModel");
const booking = require("../models/BookingModel");
const flight = require("../models/FlightModel");

const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.body);
  const id = req.body._id;
  user.findOne({ email: req.body.email }).then((userExists) => {
    if (!userExists) {
      res.status = 400;
      res.writeHead(400, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify({ message: "USER_DOESNT_EXISTS" }));
    } else {
      flight
        .findOne({ flightNumber: req.body.flightNumber })
        .then((flightExists) => {
          if (!flightExists) {
            res.status = 400;
            res.writeHead(400, {
              "Content-Type": "application/json",
            });
            res.end(JSON.stringify({ message: "USER_DOESNT_EXISTS" }));
          } else {
            try {
              booking.create(
                {
                  user: userExists._id,
                  flights: flightExists._id,
                  totalAmount: flightExists.perSeatCost,
                },
                async (err, book) => {
                  if (book) {
                    await userExists.booking.push(book._id);
                    userExists.mileage += flightExists.mileage;
                    await userExists.save();
                    res.status = 200;
                    res.writeHead(200, {
                      "Content-Type": "application/json",
                    });
                    res.end(
                      JSON.stringify({
                        _id: book._id,
                        message: "BOOKING_CREATED",
                      })
                    );
                  } else {
                    res.status = 400;
                    res.writeHead(400, {
                      "Content-Type": "application/json",
                    });
                    res.end(JSON.stringify({ message: "BOOKING_ERROR" }));
                  }
                }
              );
            } catch (e) {
              res.status = 400;
              res.writeHead(400, {
                "Content-Type": "application/json",
              });
              res.end(JSON.stringify({ message: "SYSTEM_ERROR" }));
            }
          }
        });
    }
  });
});

module.exports = router;
