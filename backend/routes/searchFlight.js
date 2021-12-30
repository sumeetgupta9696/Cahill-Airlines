/* eslint-disable no-underscore-dangle */
const express = require("express");
const Flight = require("../models/FlightModel");

const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.query);
  Flight.find({
    departureAirport: req.query.departureAirport,
    arrivalAirport: req.query.arrivalAirport,
    departureDate: req.query.departureDate,
  })
    .then((flights) => {
      res.status = 200;
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(
        JSON.stringify({
          data: flights,
          message: "FLIGHT_LIST",
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

module.exports = router;
