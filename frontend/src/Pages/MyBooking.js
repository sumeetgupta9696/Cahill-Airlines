import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Landing.css";
import NavBar from "./NavBar.js";
import airline from "../images/airline.jpg";
import { serverUrl } from "../Pages/ServerUrl";

export default class MyBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: [],
    };
  }

  componentDidMount() {
    const id = localStorage.getItem("id");
    axios
      .get(`${serverUrl}/api/bookings?id=${id}`)
      .then((response) => {
        this.setState({
          bookings: response && response.data && response.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Unable to signup using these details", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  }

  onCancelBooking = (id) => {
    axios
      .get(`${serverUrl}/api/bookings/cancel?id=${id}`)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            bookings: this.state.bookings.map((b) => {
              if (b._id === id) {
                b.status = "Cancelled";
              }

              return b;
            }),
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Unable to cancel this booking", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  render() {
    return (
      <div className="landing">
        <NavBar />
        <h1 className="mb-5">My Bookings</h1>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Passenger Name</th>
              <th scope="col">Flight Number</th>
              <th scope="col">Seat</th>
              <th scope="col">Amount</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.bookings.map((booking, i) => (
              <tr key={booking.id}>
                <th scope="row">{i}</th>
                <td>{booking.user.name}</td>
                <td>{booking.flights && booking.flights.flightNumber}</td>
                <td>{booking.seat}</td>
                <td>{booking.totalAmount}</td>
                <td>{booking.status}</td>
                <td>
                  {booking.status === "Confirmed" && (
                    <button
                      className="btn btn-danger"
                      onClick={() => this.onCancelBooking(booking._id)}
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
