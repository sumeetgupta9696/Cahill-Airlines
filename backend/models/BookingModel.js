const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookingSchema = new Schema(
  {
    seat: {
      type: String,
      default: '',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    flights: {
      type: Schema.Types.ObjectId,
      ref: 'flights',
    },
    totalAmount: {
      type: Number,
    },
    status: {
      type: String,
      enum: ['Confirmed', 'Cancelled'],
      default: 'Confirmed',
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('booking', bookingSchema);
