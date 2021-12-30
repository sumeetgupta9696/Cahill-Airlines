import { Col, Row, Card } from "react-bootstrap";
import styles from "./FlightCard.module.css";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../Pages/ServerUrl";
import axios from "axios";

const FlightCard = (props) => {
  const navigate = useNavigate();

  return (
    <Col className="col-sm-4">
      <Card className={styles.flightCard}>
        <Card.Body
          onClick={() => {
            let email = localStorage.getItem("email");
            let flightNumber = props.id.flightNumber;
            let price = props.id.perSeatCost;

            let data = {
              email,
              flightNumber,
              price,
            };
            axios({
              method: "post",
              url: serverUrl + `/api/createbooking`,
              headers: {
                "Content-Type": "application/json",
              },
              data,
            })
              .then((response) => {
                console.log("-------FLIGHT------", response);
                navigate(`/purchase`);
                localStorage.setItem('bookingId', response.data._id);
                localStorage.setItem('flightNumber', props.id.flightNumber);

              })
              .catch((error) => {
                console.log(
                  "There were some problems while performing the task."
                );
              });
          }}
        >
          <Card.Title>{props.id.flightNumber}</Card.Title>

          <Card.Text>
            <Row>
              <div className="col-sm-6">
                <div style={{ fontSize: "large" }}>
                  {props.id.departureAirport} - {props.id.arrivalAirport}
                </div>
              </div>
              <div
                className="col-sm-6"
                style={{ fontSize: "x-larger", textAlign: "center" }}
              >
                {props.id.perSeatCost}$
              </div>
              <div className="col-sm-6" style={{ fontStyle: "oblique" }}>
                {props.id.departureTime} - {props.id.arrivalTime}
              </div>
            </Row>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};
export default FlightCard;
