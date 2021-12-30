/* eslint-disable no-underscore-dangle */
const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const bcrypt = require('bcrypt');
const Flight = require('../models/FlightModel');

const router = express.Router();

router.post("/", (req, res) => {
    console.log(req.body);
    Flight.findOne({ flightNumber: req.body.flightNumber })
    .then((flightExists)=>{
    if (flightExists) {
      res.status = 400;
      res.writeHead(400, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify({ message: 'FLIGHT_ALREADY_EXISTS' }));
    } else {
      const flight = new Flight(req.body);
      flight.save();
        console.log("inside try",flight);
        res.status = 200;
          res.writeHead(200, {
            "Content-Type": "application/json",
          });
          res.end(
            JSON.stringify({
                flightNumber: flight.flightNumber,
                departureAirport: flight.departureAirport,
                arrivalAirport: flight.arrivalAirport,
                departureDate: flight.departureDate,
                arrivalDate: flight.arrivalDate,
                departureTime: flight.departureTime,
                arrivalTime: flight.arrivalTime,
                mileage: flight.mileage,
              message: "NEW_FLIGHT_CREATED",
            })
          );
      } 
    }).catch( (e) =>{
        res.status = 400;
      res.writeHead(400, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify({ message: 'SYSTEM_ERROR' }));
      });
});

module.exports = router;