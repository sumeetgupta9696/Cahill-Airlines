import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { Container, Form, Button, Row, Col, ListGroup } from "react-bootstrap";
import NavBar from "./NavBar.js";
import airplane from "../images/airplane-takeoff.jpg";
import FlightCard from "../Components/FlightCard";
import { serverUrl } from "../Pages/ServerUrl";

export default class SearchFlight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flightNumber: "",
      departureAirport: "",
      arrivalAirport: "",
      departureDate: "",
      arrivalDate: "",
      departureTime: "",
      arrivalTime: "",
      mileage: "",
      flightData: [],
    };
  }

  flightNumberHandler = (e) => {
    this.setState({
      flightNumber: e.target.value,
    });
  };

  departureAirportHandler = (e) => {
    this.setState({
      departureAirport: e.target.value,
    });
  };

  arrivalAirportHandler = (e) => {
    this.setState({
      arrivalAirport: e.target.value,
    });
  };

  departureDateHandler = (e) => {
    this.setState({
      departureDate: e.target.value,
    });
  };

  arrivalDateHandler = (e) => {
    this.setState({
      arrivalDate: e.target.value,
    });
  };

  departureTimeHandler = (e) => {
    this.setState({
      departureTime: e.target.value,
    });
  };

  arrivalTimeHandler = (e) => {
    this.setState({
      arrivalTime: e.target.value,
    });
  };

  mileageHandler = (e) => {
    this.setState({
      mileage: e.target.value,
    });
  };

  addFlight = (e) => {
    e.preventDefault();
    axios
      .post(`${serverUrl}/api/addflight`, this.state)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
        }
        this.setState({
          flightNumber: "",
          departureAirport: "",
          arrivalAirport: "",
          departureDate: "",
          arrivalDate: "",
          departureTime: "",
          arrivalTime: "",
          mileage: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getFlight = () => {
    console.log("inside getflight");
    axios
      .get(`${serverUrl}/api/getAllFlight`, this.state)
      .then((response) => {
        console.log(response.data);
        this.setState({
          flightData: response.data.flightExists,
        });
        console.log("flightdata----------------", this.state.flightData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onDeleteFlight = (id) => {
    axios
      .delete(`${serverUrl}/api/deleteFlight/${id}`)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            flightData: this.state.flightData.map((f) => {
              if (f._id === id) {
                f.status = "Deleted";
              }
              return f;
            }),
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Unable to delete this flight", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  render() {
    const { flightData, phone, email, password } = this.state;
    let redirectVar = null;
    const data = this.state.flightData;
    let message = "";
    return (
      <div>
        {redirectVar}
        <NavBar />
        <Container>
          <Row>
            <Col>&nbsp;</Col>
          </Row>
          <Row>
            <Col xs lg="2">
              {"\u00A0"}
            </Col>
            <Col>
              <h4>Add Flights</h4>
            </Col>
            <Col>
              <Form
                noValidate
                validated={this.state.validated}
                onSubmit={this.addFlight}
              >
                <div style={{ color: "#ff0000" }}>{message}</div>
                <Form.Group controlId="formBasicNumber">
                  <Form.Label>Please enter Flight Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="flightNumber"
                    value={this.state.flightNumber}
                    placeholder="Enter Flight Number"
                    onChange={this.flightNumberHandler}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter valid flight number.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formBasicNumber">
                  <Form.Label>Please enter mileage covered</Form.Label>
                  <Form.Control
                    type="number"
                    name="mileage"
                    value={this.state.mileage}
                    placeholder="Enter mileage covered"
                    onChange={this.mileageHandler}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid mileage number.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Please enter Departure Airport</Form.Label>
                  <Form.Control
                    type="text"
                    name="departureAirport"
                    value={this.state.departureAirport}
                    placeholder="Enter Departure Airport"
                    onChange={this.departureAirportHandler}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter valid airport name.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Please enter Arrival Airport</Form.Label>
                  <Form.Control
                    type="text"
                    name="arrivalAirport"
                    value={this.state.arrivalAirport}
                    placeholder="Enter Arrival Airport"
                    onChange={this.arrivalAirportHandler}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter valid airport name.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formBasicDate">
                  <Form.Label>Please enter Departure Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="departureDate"
                    value={this.state.departureDate}
                    placeholder="Enter Departure Date"
                    onChange={this.departureDateHandler}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter valid date.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formBasicDate">
                  <Form.Label>Please enter Arrival Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="arrivalDate"
                    value={this.state.arrivalDate}
                    placeholder="Enter Arrival Airport"
                    onChange={this.arrivalDateHandler}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter valid date.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Please enter Departure Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="departureTime"
                    value={this.state.departureTime}
                    placeholder="Enter Departure Airport"
                    onChange={this.departureTimeHandler}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter valid name.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formBasicDate">
                  <Form.Label>Please enter Arrival Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="arrivalTime"
                    value={this.state.arrivalTime}
                    placeholder="Enter Arrival Airport"
                    onChange={this.arrivalTimeHandler}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter valid name.
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  style={{ backgroundColor: "#ADD8E6", marginTop: "20px" }}
                  type="submit"
                >
                  Add Flight
                </Button>
                &nbsp;&nbsp;
              </Form>
            </Col>
            <Col xs lg="2">
              {"\u00A0"}
            </Col>
          </Row>
          <Row></Row>
        </Container>
        <br />
        <Button
          style={{
            backgroundColor: "#ADD8E6",
            marginLeft: "50%",
            marginTop: "20px",
          }}
          onClick={this.getFlight}
        >
          Get Flights
        </Button>
        <br />
        <br />
        <Row>
          <Col>Flight Number</Col>
          <Col>Departure Airport</Col>
          <Col>Arrival Airport</Col>
          <Col>Departure Date</Col>
          <Col>Arrival Date</Col>
          <Col>Departure Time</Col>
          <Col>Arrival Time</Col>
          <Col>Mileage</Col>
          <Col></Col>
        </Row>
        <br />
        {console.log("Checking flight ", flightData)}
        {flightData.map((items) => {
          return (
            <Row>
              <Col>{items.flightNumber}</Col>
              <Col>{items.departureAirport}</Col>
              <Col>{items.arrivalAirport}</Col>
              <Col>{items.departureDate}</Col>
              <Col>{items.arrivalDate}</Col>
              <Col>{items.departureTime}</Col>
              <Col>{items.arrivalTime}</Col>
              <Col>{items.mileage}</Col>
              <Col>
                {items.status !== "Deleted" && (
                  <button
                    className="btn btn-danger"
                    onClick={() => this.onDeleteFlight(items._id)}
                  >
                    Delete
                  </button>
                )}
                <div style={{ color: "red" }}>{items.status}</div>
              </Col>
            </Row>
          );
        })}
      </div>
    );
  }
}
