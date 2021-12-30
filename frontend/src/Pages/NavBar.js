import React, { Component } from 'react';
import {
  Navbar, Nav, Dropdown, Col,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../images/airplane-takeoff.svg';
import Cookies from 'js-cookie'

export default class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      name: localStorage.getItem('name'),
    };
  }

  handleLogout = () => {
    localStorage.removeItem('idToken');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('user');
    localStorage.removeItem('phone');
    localStorage.removeItem('mileage');
    localStorage.removeItem('id');
    Cookies.remove('Role');
  };

  render() {
    let navUser = null;
    let nameDropDown = null;
    nameDropDown = (
      <Dropdown>
        <Dropdown.Toggle style={{backgroundColor: '#C0C0C0'}} variant="light" id="dropdown-basic">
          &nbsp;
          {this.state.name}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item><Link to="/" className="nav-link" onClick={this.handleLogout}>Log out</Link></Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );

    if ((localStorage.getItem('idToken')) && (Cookies.get('Role')==='Customer')) {
      // navLocation = '/home';
      navUser = (
        <div className="collapse navbar-collapse navbar-right" id="navbarNav">
          <Navbar.Brand>
            <Link to="/searchflight">
              <img src={Logo} width="60" height="auto" className="d-inline-block align-top" alt="Airline" />
            </Link>
          </Navbar.Brand>
          <h3>Cahill Airlines</h3>
          <Nav className="mr-auto" />
          <Nav.Item className="btn" style={{backgroundColor: '',"margin-right": "15px","border-radius": "5px"}} variant="light"><Link to="/searchflight">Search Flight</Link></Nav.Item>
          <Nav.Item className="btn" style={{backgroundColor: '',"margin-right": "15px","border-radius": "5px"}} variant="light"><Link to="/booking">My Booking</Link></Nav.Item>
          <Nav.Item className="btn" style={{backgroundColor: '',"margin-right": "15px","border-radius": "5px"}} variant="light"><Link to="/profile">Profile Page</Link></Nav.Item>
          <Nav.Item><Nav.Link>{nameDropDown}</Nav.Link></Nav.Item>
        </div>
      );
    }
    else if((localStorage.getItem('idToken')) && (Cookies.get('Role')==='Admin')){
      console.log("inside admin home");
      navUser = (
        <div className="collapse navbar-collapse navbar-right" id="navbarNav">
          <Navbar.Brand>
            <Link to="/adminhome">
              <img src={Logo} width="60" height="auto" className="d-inline-block align-top" alt="Airline" />
            </Link>
          </Navbar.Brand>
          <h3>Cahill Airlines</h3>
          <Nav.Item><Nav.Link>{nameDropDown}</Nav.Link></Nav.Item>
        </div>
      );
    }
    else {
      // navLocation = '/';
      navUser = (
        <div className="collapse navbar-collapse navbar-right" id="navbarNav">
          <Navbar.Brand>
            <Link to="/">
              <img src={Logo} width="60" height="auto" className="d-inline-block align-top" alt="Airline" />
            </Link>
          </Navbar.Brand>
          <h3>Cahill Airlines</h3>
          <Nav className="mr-auto" />
        </div>
      );
    }

    return (
      <div>
        <Navbar style={{ backgroundColor: '#ADD8E6' }} variant="light">
          <Col xs lg="1">
            {'\u00A0'}
          </Col>
          {navUser}
          <Col xs lg="1">
            {'\u00A0'}
          </Col>
        </Navbar>
      </div>
    );
  }
}