/* eslint-disable no-underscore-dangle */
const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');

const router = express.Router();

router.post("/", async (req, res) => {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      res.status = 400;
      res.writeHead(400, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify({ message: 'USER_ALREADY_EXISTS' }));
    } else {
      const user = new User(req.body);
      user.password = bcrypt.hashSync(req.body.password, 10);
      try {
        user.save();
        res.status = 200;
        const token = jwt.sign(
            {
              id: user._id,
            },
            config.secret,
            {
              expiresIn: 1008000,
            }
          );
          const jwtToken = `JWT ${token}`;
          res.writeHead(200, {
            "Content-Type": "application/json",
          });
          res.end(
            JSON.stringify({
              name: user.name,
              email: user.email,
              phone: user.phone,
              mileage: user.mileage,
              image: user.image,
              id:user._id,
              message: "NEW_USER_CREATED",
              idToken: jwtToken,
            })
          );
      } catch (e) {
        res.status = 400;
      res.writeHead(400, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify({ message: 'SYSTEM_ERROR' }));
      }
    }
});

module.exports = router;