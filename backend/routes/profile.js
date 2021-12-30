const express = require("express");
const jwtDecode = require("jwt-decode");
const User = require("../models/UserModel");

const router = express.Router();

router.put("/", (req, res) => {
  User.findOne({ email: req.body.email }).then((oldUser) => {
    if (!oldUser) {
      res.status = 404;
      res.writeHead(404, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify({ message: "PROFILE_NOT_FOUND" }));
    } else {
      console.log("inside logic");
      const filter = { email: req.body.email };
      const update = {
        name: req.body.name ? req.body.name : oldUser.name,
        email: req.body.email ? req.body.email : oldUser.email,
        phone: req.body.phone ? req.body.phone : oldUser.phone,
        mileage: req.body.mileage ? req.body.mileage : oldUser.mileage,
      };
      const updatedUser = User.findOneAndUpdate(filter, update, {
        new: true,
        useFindAndModify: true,
      }).then((updatedUser) => {
        console.log(updatedUser);
        res.status = 200;
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        res.end(
          JSON.stringify({
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            mileage: updatedUser.mileage,
            _id: updatedUser._id,
            message: "PROFILE_UPDATE_SUCCESS",
          })
        );
      });
    }
    console.log(res.data);
  });
});

router.get("/:id", async (req, res) => {
  const user = await User.findById({
    _id: req.params.id,
  });

  if (user) {
    res.status = 200;
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(JSON.stringify(user));
  } else {
    res.status = 400;
    res.writeHead(400, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ message: "PROFILE_NOT_FOUND" }));
  }
});

module.exports = router;
