import React, { Component } from "react";
import "./Landing.css";
import NavBar from "./NavBar.js";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import flightImage from "./airline.png";
import { GoSearch } from "react-icons/go";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { MdFlight } from "react-icons/md";
import { useState } from "react";
import FlightCard from "../Components/FlightCard";
import axios from "axios";
import { serverUrl } from "./ServerUrl";

const SearchFlight = () => {
  const [date, setDate] = useState();
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [flightData, setFlightData] = useState([]);
  const fetchFlights = () => {
    axios({
      method: "get",
      url:
        serverUrl +
        `/api/searchFlight/?departureAirport=${from}&arrivalAirport=${to}&departureDate=${date}`,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        setFlightData(response.data.data);
        console.log("List of restaurants", response.data.data);
      })
      .catch((error) => {
        console.log("-------------Indise the error-------------", error);
        console.log(error);
      });
  };
  return (
    <Container style={{ minHeight: "100vh" }} fluid className="landing">
      <NavBar />
      <Row>
        <Col className="col-sm offset-1">
          <img src={flightImage}></img>
        </Col>
      </Row>
      <Container style={{ minHeight: "80vh" }}>
        <Row>
          <Row>
            <div
              style={{
                width: "-webkit-fill-available;",
                height: "156px",

                borderRadius: "8px",
                boxShadow:
                  "0px 1px 3px 0px rgb(60 64 67 / 30%), 0px 4px 8px 3px rgb(60 64 67 / 15%)",
              }}
            >
              <Row>
                <Col className="col-sm-4">
                  <input
                    type="text"
                    style={{
                      lineHeight: "3rem",
                      width: "-webkit-fill-available",
                      marginTop: "15%",
                      borderRadius: "8px",
                    }}
                    onChange={(e) => {
                      setFrom(e.target.value, ...from);
                      console.log("--------", from);
                    }}
                    placeholder="From"
                  ></input>
                </Col>
                <Col className="col-sm-4">
                  {" "}
                  <input
                    type="text"
                    style={{
                      lineHeight: "3rem",
                      width: "-webkit-fill-available",
                      marginTop: "15%",
                      borderRadius: "8px",
                    }}
                    onChange={(e) => {
                      setTo(e.target.value, ...to);
                    }}
                    placeholder="Destination"
                  ></input>
                </Col>
                <Col className="col-sm-3">
                  <Form.Group
                    style={{ marginTop: "15%" }}
                    controlId="formBasicDate"
                  >
                    <Form.Label>Please select the date</Form.Label>
                    <Form.Control
                      type="date"
                      name="arrivalDate"
                      placeholder="Enter Arrival Airport"
                      onChange={(e) => {
                        console.log("---------------", e.target.value);
                        setDate(e.target.value);
                      }}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
            <Row className="justify-content-center">
              <Button
                onClick={() => {
                  fetchFlights();
                }}
                style={{
                  borderRadius: "24px",
                  boxShadow:
                    " 0px 1px 3px 0px rgb(60 64 67 / 30%), 0px 4px 8px 3px rgb(60 64 67 / 15%);",
                  width: "fit-content",
                }}
              >
                <GoSearch />
                Search
              </Button>
            </Row>
          </Row>
        </Row>
        <Row style={{ paddingTop: "5%", borderLeft: "0" }}>
          {flightData.map((items) => {
            return <FlightCard id={items} />;
          })}
        </Row>
      </Container>
    </Container>
  );
};
export default SearchFlight;
