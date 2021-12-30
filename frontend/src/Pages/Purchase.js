import React, {Component} from 'react'
import {
  Row, Col, Form, Button, Image,
} from 'react-bootstrap'; 
import NavBar from "./NavBar.js";
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import SeatPicker from 'react-seat-picker';
import { serverUrl } from "../Pages/ServerUrl";
 
export default class Purchase extends Component {
  constructor(props) {
    super(props);
    const data= localStorage.getItem('user');
    this.state = {
      validated: false,
      flightNumber:localStorage.getItem('flightNumber'),
      seatnumber:'',
      seatrow:'',
      seatid:'',
      seat:'',
      email:localStorage.getItem('email'),
      name:localStorage.getItem('name'),
      booking:'',
    };
  }
  state = {
    loading: false
  }
 
  addSeatCallbackContinousCase = ({ row, number, id }, addCb, params, removeCb) => {
    this.setState({
      loading: true,
      seatnumber: this.state.seatnumber,
      seatrow: this.state.seatrow,
    }, async () => {
      if (removeCb) {
        await new Promise(resolve => setTimeout(resolve, 750))
        console.log(`Removed seat ${params.number}, row ${params.row}, id ${params.id}`)
        removeCb(params.row, params.number)
      }
      await new Promise(resolve => setTimeout(resolve, 750))
      const newTooltip = `Reserved the seat ${number}, row ${row} by ${this.state.name} `;
      addCb(row, number, id, newTooltip);
      this.setState({
        loading: false,
        seatrow: row,
        seatnumber: number,
        seatid: id,
      })
      const seats = this.state.seatrow+ this.state.seatnumber;
      this.setState({
        seat: seats,
        booking: localStorage.getItem('bookingId'),
        flightNumber: localStorage.getItem('flightNumber'),
      })
      console.log("Seat: ", this.state.seat);
      console.log("flightNumber: ", this.state.flightNumber);
      console.log("booking id: ", this.state.booking);
      console.log("Seat row: ", this.state.seatrow);
      console.log("Seat number: ", this.state.seatnumber);
    })
  }
 
  removeSeatCallback = ({ row, number, id }, removeCb) => {
    this.setState({
      loading: true
    }, async () => {
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log(`Removed seat ${number}, row ${row}, id ${id}`)
      const newTooltip = ['A', 'B', 'C'].includes(row) ? null : ''
      removeCb(row, number, newTooltip)
      this.setState({ loading: false })
    })
  }

  onPurchase=(e)=>{
    console.log("inside purchase");
    e.preventDefault();
       axios.post(`${serverUrl}/api/purchase`, this.state)
         .then((response) => {
           console.log(response)
           localStorage.removeItem('bookingId');
           localStorage.removeItem('flightNumber');
           const { password, ...user } = response.data
           window.location.href = '/booking'
         }).catch(err => {
           console.log(err)
           toast.error("Unable to signup using these details", {position: toast.POSITION.TOP_CENTER});
       })

}
 
  render() {
    const rows = [
      [{id: 1, number: 1, isSelected: false, tooltip: 'Cost: 25$'}, {id: 2, number: 2, tooltip: 'Cost: 15$'}, null, {id: 3, number: '3', isReserved: true, orientation: 'east', tooltip: 'Cost: 15$'}, {id: 4, number: '4', orientation: 'west', tooltip: 'Cost: 15$'}, null, {id: 5, number: 5, tooltip: 'Cost: 15$'}, {id: 6, number: 6, tooltip: 'Cost: 25$'}],
      [{id: 7, number: 1, isReserved: true, tooltip: 'Cost: 25$'}, {id: 8, number: 2, isReserved: true, tooltip: 'Cost: 15$'}, null, {id: 9, number: '3', isReserved: true, orientation: 'east', tooltip: 'Cost: 15$'}, {id: 10, number: '4', orientation: 'west', tooltip: 'Cost: 15$'}, null, {id: 11, number: 5, tooltip: 'Cost: 15$'}, {id: 12, number: 6, tooltip: 'Cost: 25$'}],
      [{id: 13, number: 1, tooltip: 'Cost: 25$'}, {id: 14, number: 2, tooltip: 'Cost: 15$'}, null, {id: 15, number: 3, isReserved: false, orientation: 'east', tooltip: 'Cost: 15$'}, {id: 16, number: '4', orientation: 'west', tooltip: 'Cost: 15$'}, null, {id: 17, number: 5, tooltip: 'Cost: 15$'}, {id: 18, number: 6, tooltip: 'Cost: 25$'}],
      [{id: 19, number: 1, tooltip: 'Cost: 25$'}, {id: 20, number: 2, tooltip: 'Cost: 15$'}, null, {id: 21, number: 3, orientation: 'east', tooltip: 'Cost: 15$'}, {id: 22, number: '4', orientation: 'west', tooltip: 'Cost: 15$'}, null, {id: 23, number: 5, tooltip: 'Cost: 15$'}, {id: 24, number: 6, tooltip: 'Cost: 25$'}],
      [{id: 25, number: 1, isReserved: true, tooltip: 'Cost: 25$'}, {id: 26, number: 2, orientation: 'east', tooltip: 'Cost: 15$'}, null, {id: 27, number: '3', isReserved: true, tooltip: 'Cost: 15$'}, {id: 28, number: '4', orientation: 'west', tooltip: 'Cost: 15$'}, null,{id: 29, number: 5, tooltip: 'Cost: 15$'}, {id: 30, number: 6, isReserved: true, tooltip: 'Cost: 25$'}]
    ];
    
    const {loading} = this.state;
    let redirectVar = null;
    return (
      <div>
        {redirectVar}
        <NavBar />
        <div className="mt-5">
          <Row className="mt-3">
            <Col md={{ offset: 4 }} className="mt-5 pt-5">
              <Form noValidate validated={this.state.validated} onSubmit={this.onPurchase}>
                <Form.Row>
                  <Form.Group as={Col} md="4">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      name="email"
                      type="email"
                      value={this.state.email}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid email address.
                    </Form.Control.Feedback>
                  </Form.Group>
                  &nbsp;&nbsp;&nbsp;
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="4">
                    <Form.Label>Flight Number</Form.Label>
                    <Form.Control
                      name="flightNumber"
                      type="text"
                      value={this.state.flightNumber}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter your name.
                    </Form.Control.Feedback>
                  </Form.Group>
                  &nbsp;&nbsp;&nbsp;
                </Form.Row>
                <div style={{ marginTop: '10px', marginBottom:'50px' }}>
                  <SeatPicker
                  addSeatCallback={this.addSeatCallbackContinousCase}
                  removeSeatCallback={this.removeSeatCallback}
                  rows={rows}
                  maxReservableSeats={1}
                  alpha
                  visible
                  selectedByDefault
                  loading={loading}
                  tooltipProps={{ multiline: true }}
                  continuous
                  />
                </div>
                <Form.Row>
                  <Form.Group as={Col} md="4">
                    <Button variant="info" type="submit" style={{ width: '8rem' }}>Purchase Seat</Button>
                  </Form.Group>
                </Form.Row>
              </Form>
            </Col>
          </Row>
        </div>
        <div>
      </div>
      </div>
      
    )
  }
}