const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
const express = require('express');
const jwt = require("jsonwebtoken");
const config = require("../config/config");


const router = express.Router();

router.post('/', (req, res) => {
    console.log(req.body);    
    User.findOne({ $and: [{email: req.body.email},{role:req.body.role}] })
      .then((user) => {
        console.log(user);
        if (!user) {
          res.status = 404;
          res.writeHead(404, {
            "Content-Type": "application/json",
          });
          res.end(JSON.stringify({ message: "USER_DOES_NOT_EXIST" }));
        } else {
          bcrypt.compare(req.body.password, user.password, async (err, match) => {
            console.log(`Match: ${match}`);
            if (err) {
              console.log('in bcrypt error');
              res.status=403
              res.writeHead(403, {
                "Content-Type": "application/json",
              });
              res.end(JSON.stringify({ message: "BCRYPT_ERROR" }));
            }
            if (!match) {
              console.log('in match error');
              res.status=403
              res.writeHead(403, {
                "Content-Type": "application/json",
              });
              res.end(JSON.stringify({ message: "INCORRECT_PASSWORD" }));
            }
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
              res.status = 200;
              res.writeHead(200, {
                "Content-Type": "application/json",
              });
              res.end(
                JSON.stringify({
                  name: user.name,
                  email: user.email,
                  phone: user.phone,
                  image: user.image,
                  mileage: user.mileage,
                  role: user.role,
                  id: user._id,
                  message: "USER_LOGGED_IN",
                  idToken: jwtToken,
                })
              );
          });
        }
      }).catch((e) => {
        console.log(e);
      });
});

module.exports = router;