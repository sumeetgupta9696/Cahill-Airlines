import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import NavBar from './NavBar.js';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from "../Pages/ServerUrl";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: 'Customer',
      email: '',
      password: '',
    };
  }

  handleLogin = (e) => {
    e.preventDefault();
    console.log(this.state.email);
    const { email, password, role } = this.state;
    axios
      .post(serverUrl+'/api/login', this.state)
      .then((response) => {
        console.log(response.data);
        const { password, ...user } = response.data;

        if (response.status === 200) {
          if (role === 'Customer' && response.data.role === 'Customer') {
            localStorage.setItem(
              'idToken',
              JSON.stringify(response.data.idToken)
            );
            localStorage.setItem('name', response.data.name);
            localStorage.setItem('email', response.data.email);
            localStorage.setItem('phone', response.data.phone);
            localStorage.setItem('id', response.data.id);
            localStorage.setItem('mileage', response.data.mileage);
            localStorage.setItem('user', JSON.stringify(user));
            Cookies.set('Role', 'Customer');
            window.location.href = '/searchflight';
          } else if (role === 'Admin' && user.role === 'Admin') {
            localStorage.setItem(
              'idToken',
              JSON.stringify(response.data.idToken)
            );
            localStorage.setItem('name', response.data.name);
            localStorage.setItem('user', JSON.stringify(user));
            Cookies.set('Role', 'Admin');
            window.location.href = '/adminhome';
          } else {
            toast.error("You're signing in with incorrect role", {
              position: toast.POSITION.TOP_CENTER,
            });
            return;
          }
        } else if (response.status === 404) {
          toast.error('User Login not found', {
            position: toast.POSITION.TOP_CENTER,
          });
          return;
        }
      })
      .catch(() => {
        toast.error('Incorrect Login Credentials', {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  emailChangeHandler = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  passwordChangeHandler = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  roleChangeHandler = (e) => {
    console.log(e.target.value);
    this.setState({
      role: e.target.value,
      email: '',
      password: '',
    });
  };
  render() {
    return (
      <div>
        <NavBar />
        <div className="row justify-content-center mb-5">
          <div className="col-auto">
            <h1>Airline Reservation system</h1>
          </div>
        </div>
        <div className="row justify-content-center mt-5">
          <div className="col-6">
            <form onSubmit={this.handleLogin} className="form-signin">
              <h4>Welcome Back!</h4>
              <input
                onChange={this.emailChangeHandler}
                value={this.state.email}
                type="email"
                name="email"
                className="form-control mb-3"
                placeholder="Email Address"
                required
                autoFocus
              />
              <input
                onChange={this.passwordChangeHandler}
                value={this.state.password}
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                required
              />
              <div className="row justify-content-between mt-3">
                <div className="col-auto">
                  <div className="row align-items-center">
                    <div className="col-6">
                      <h5>Sign in as</h5>
                    </div>
                    <div className="col-6">
                      <select
                        class="form-select"
                        onChange={this.roleChangeHandler}
                      >
                        <option value="Customer">Customer</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <button className="btn btn-primary" type="submit">
                    Login
                  </button>
                </div>
              </div>
              <br />
              <p className="display--inline">
                Don't have account yet?{' '}
                <a className="login-a" href="/signup">
                  SignUp
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
