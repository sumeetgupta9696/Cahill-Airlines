import React, { Component } from 'react';
import './Landing.css';
import NavBar from './NavBar.js';
import airline from '../images/image.jpg';
import { Jumbotron, Container, Col, Row } from 'react-bootstrap';
import '../App.css';
import { Link } from 'react-router-dom';

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  login = (e) => {
    e.preventDefault();
    window.location.replace('/login');
  };

  render() {
    return (
      <div className="landing-page">
        <div>
          <NavBar />
          <div className="row justify-content-center">
            <div className="col-auto">
              <h1
                className="mt-5"
                style={{
                  fontWeight: 700,
                  color: '#ffffff',
                }}
              >
                Airline Reservation System
              </h1>
            </div>
          </div>
          <div className="row justify-content-center mt-5">
            <div className="col-auto">
              <Link
                to="/login"
                className="btn btn-light"
                style={{ marginLeft: '25%' }}
              >
                Login
              </Link>
            </div>
            <div className="col-auto">
              <Link
                to="/signup"
                className="btn btn-light"
                style={{ marginLeft: '15%' }}
              >
                SignUp
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
