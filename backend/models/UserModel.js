const mongoose = require("mongoose");

const { Schema } = mongoose;

const usersSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "Customer",
    },
    mileage: {
      type: Number,
      default: 0,
    },
    booking: [
      {
        type: Schema.Types.ObjectId,
        ref: "booking",
      },
    ],
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("user", usersSchema);
