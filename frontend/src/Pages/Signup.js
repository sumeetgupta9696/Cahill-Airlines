import React, { Component } from 'react';
import {Navigate} from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import {
    Container, Form, Button, Row, Col,
  } from 'react-bootstrap';
import NavBar from './NavBar.js';
import airplane from '../images/airplane-takeoff.jpg';
import { serverUrl } from './ServerUrl.js';


export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated:false,
            name: '',
            email: '',
            password: '',
            phone:'',
        };
    }

    signUp = (e) => {
        console.log("inside signup");
        e.preventDefault();
           axios.post(`${serverUrl}/api/signup`, this.state)
             .then((response) => {
               console.log(response)
               const { password, ...user } = response.data
               if(response.status===200){
                localStorage.setItem("idToken", JSON.stringify(response.data.idToken))
                localStorage.setItem("name", response.data.name)
                localStorage.setItem("email", response.data.email)
                localStorage.setItem("phone", response.data.phone)
                localStorage.setItem("id", response.data.id)
                localStorage.setItem("mileage", response.data.mileage)
                localStorage.setItem("user", JSON.stringify(user))
                Cookies.set('Role', 'Customer');
                 const CustomToast = ({closeToast})=>{
                   return(
                     <div  style={{textAlign:"center"}}>
                       <h4>Successfully Created Account!</h4>
                     </div>
                   )
                 }
                 toast.success(<CustomToast />, {position: toast.POSITION.TOP_CENTER, autoClose:true})
               }
               window.location.href = '/searchflight'
             }).catch(err => {
               console.log(err)
               toast.error("Unable to signup using these details", {position: toast.POSITION.TOP_CENTER});
           })

    }

    nameChangeHandler = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    emailChangeHandler = (e) => {
        this.setState({
            email: e.target.value
        });
    }

    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        });
    }
    phoneChangeHandler = (e) => {
        this.setState({
            phone: e.target.value,
        });
    };

    render() {
        const user = Cookies.get('Role')
        if (user) {
            if (user === "Customer") {
                window.location.replace('/searchflight')
            }
            else if (user === "Admin") {
                window.location.replace('/adminhome')
            }
        }
        const { name, phone, email, password } = this.state;
        let redirectVar = null;
        let message = '';
        return (
            <div>
        {redirectVar}
        <NavBar />
        <Container>
          <Row>
            <Col>&nbsp;</Col>
          </Row>
          <Row>
            <Col xs lg="2">{'\u00A0'}</Col>
            <Col>
            <h4>Airline Reservation System</h4>
              <img src={airplane} className="img-fluid rounded float-right" style={{ height: 200, width: 200 }} alt="airplane" />
            </Col>
            <Col>
              <Form noValidate validated={this.state.validated} onSubmit={this.signUp}>
                <div style={{ color: '#ff0000' }}>{message}</div>
                <Form.Group >
                  <Form.Label>Please enter your Name</Form.Label>
                  <Form.Control
                    type="name"
                    name="name"
                    value={this.state.name}
                    placeholder="Enter Name"
                    onChange={this.nameChangeHandler}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter valid name.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicName">
                  <Form.Label>Please enter your Phone Number</Form.Label>
                  <Form.Control
                    type="number"
                    name="phone"
                    value={this.state.phone}
                    placeholder="Enter Phone Number"
                    onChange={this.phoneChangeHandler}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter valid name.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Please enter Email address</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    value={this.state.email}
                    placeholder="Enter email"
                    onChange={this.emailChangeHandler}
                    pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid email.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Please enter Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={this.state.password}
                    placeholder="Password"
                    onChange={this.passwordChangeHandler}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid password.
                  </Form.Control.Feedback>
                </Form.Group>

                <Button style={{backgroundColor: "#ADD8E6" , marginTop:"20px"}} type="submit">
                  Signup
                </Button>
              &nbsp;&nbsp;
                <div style={{marginTop:"10px"}}>
                    <p className="display--inline">Already have an account? <a className="login-a" href="/login">Login</a></p>
                </div>
              </Form>
            </Col>
            <Col xs lg="2">{'\u00A0'}</Col>
            <Col>

            </Col>
          </Row>
          <Row>
          </Row>

        </Container>
      </div>
        );
    }
}