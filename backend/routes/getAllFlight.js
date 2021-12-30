/* eslint-disable no-underscore-dangle */
const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const bcrypt = require('bcrypt');
const Flight = require('../models/FlightModel');

const router = express.Router();

router.get("/", (req, res) => {
    Flight.find({})
    .then((flightExists)=>{
    if (!flightExists) {
      res.status = 400;
      res.writeHead(400, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify({ message: 'FLIGHT_ALREADY_EXISTS' }));
    } else {
        res.status = 200;
          res.writeHead(200, {
            "Content-Type": "application/json",
          });
          res.end(
            JSON.stringify({
              flightExists,
              message: "FLIGHT_LIST",
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