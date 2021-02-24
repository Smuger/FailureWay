import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Chart from "../components/Chart";
import { listServiceDetails } from "../actions/serviceActions";
import { postUserMessage } from "../actions/userActions";
import ReactLazyLoad from "../components/ReactLazyLoad";
import { Controlled as ControlledZoom } from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Review from "../components/Review";

const ServiceScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [random1or2, setRandom1or2y] = useState(1);
  const [message, setMessage] = useState("");
  const [test, setTest] = useState("");
  const dispatch = useDispatch();
  const [chartPicked, setChartPicked] = useState("BarChart");
  const [time, setTime] = useState("");
  const [isZoomed, setIsZoomed] = useState(false);

  const handleImgLoad = useCallback(() => {
    setIsZoomed(true);
  }, []);

  const services = [
    { _id: "1", name: "BarChart" },
    { _id: "2", name: "AreaChart" },
    { _id: "3", name: "LineChart" },
    { _id: "4", name: "ComposedChart" },
    { _id: "5", name: "PieChart" },
    { _id: "6", name: "RadarChart" },
    { _id: "7", name: "TreeMap" },
  ];

  const serviceDetails = useSelector((state) => state.serviceDetails);
  const { loading, error, service } = serviceDetails;

  const userSendMessage = useSelector((state) => state.userSendMessage);
  const sendMessageLoading = userSendMessage.loading;

  const wasSLABreached = () => {
    const breachFound = {
      date: null,
      type: null,
      time: null,
    };

    if (service.slaMinor > 0 || service.slaMajor > 0) {
      // SERVICE LOOP
      for (let review of service.report) {
        if (review.downtime > Math.max(service.slaMinor, service.slaMajor)) {
          // major
          if (review.severity > 0) {
            if (review.downtime > service.slaMajor) {
              breachFound.date = new Date(review.createdAt).toString();

              breachFound.type = "Major";
              breachFound.time = review.downtime;

              return (
                <Message variant="danger">
                  <Row>SLA Breached</Row>
                  <Row>Issue Type: {breachFound.type}</Row>
                  <Row>
                    Issue Timespan:{" "}
                    {breachFound.time === 8 ? "Whole Day" : breachFound.time}
                    {breachFound.time < 8
                      ? breachFound.time === 1
                        ? " hour"
                        : " hours"
                      : ""}
                  </Row>
                  <Row>{breachFound.date}</Row>
                  <Row>Estimated Penalty:</Row>
                  <Row>£1.000</Row>
                </Message>
              );
            }
          }
          // minor
          else {
            if (review.downtime > service.slaMinor) {
              breachFound.date = new Date(review.createdAt).toString();
              breachFound.type = "Minor";
              breachFound.time = review.downtime;

              return (
                <Message variant="danger">
                  <Row>SLA Breached</Row>
                  <Row>Issue Type: {breachFound.type}</Row>
                  <Row>
                    Issue Timespan:{" "}
                    {breachFound.time === 8 ? "Whole Day" : breachFound.time}
                    {breachFound.time < 8
                      ? breachFound.time === 1
                        ? " hour"
                        : " hours"
                      : ""}
                  </Row>
                  <Row>{breachFound.date}</Row>
                  <Row>Estimated Penalty:</Row>
                  <Row>£1.000</Row>
                </Message>
              );
            }
          }
        }
      }
    }
  };

  const checkSLAValuesAgainsEachOther = (review) => {};

  const arrayBufferToBase64 = (buffer) => {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };

  const messageToSend = {
    recipient: "60330769f88dad45f85f9f4f",
    message: message,
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.replace(/\s/g, "") !== "") {
      dispatch(postUserMessage(messageToSend));

      history.push("/messages");
    }
  };

  const handleEnterSendMessage = (e) => {
    if (e.key === "Enter") {
      if (!e.shiftKey) {
        if (message.replace(/\s/g, "") !== "") {
          dispatch(postUserMessage(messageToSend));
          history.push("/messages");
        }
      }
    }
  };

  const handleImageCreation = ({ review }) => {
    let base64Flag = `data:${review.img.contentType};base64,`;
    let imageStr = arrayBufferToBase64(review.img.data.data);
    let img = "";
    img = base64Flag + imageStr;
    return img;
  };

  useEffect(() => {
    dispatch(listServiceDetails(match.params.id));
  }, [match, dispatch, test]);

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={3}>
            <Form.Group controlId="service">
              <Form.Label>Chart Type:</Form.Label>
              {services !== undefined && (
                <Form.Control
                  as="select"
                  value={chartPicked}
                  onChange={(e) => setChartPicked(e.target.value)}
                >
                  {/** SERVICE MAP */}
                  {services.map((service) => (
                    <option key={service._id} value={service.name}>
                      {service.name}
                    </option>
                  ))}
                </Form.Control>
              )}
            </Form.Group>
          </Col>
          <Col md={12}>
            <Chart service={service} chartPicked={chartPicked} />
          </Col>

          <Col md={6}>
            <ListGroup variant="flush">
              <h3>SLA Details:</h3>

              {wasSLABreached()}

              <ListGroup.Item>
                <span>Major SLA Breach: </span>
                <strong>
                  {service.slaMajor === 8 ? "Whole Day" : service.slaMajor}
                  {service.slaMajor < 8
                    ? service.slaMajor === 1
                      ? " hour"
                      : " hours"
                    : ""}
                </strong>
              </ListGroup.Item>
              <ListGroup.Item>
                <span>Minor SLA Breach: </span>
                <strong>
                  {service.slaMinor === 8 ? "Whole Day" : service.slaMinor}
                  {service.slaMinor < 8
                    ? service.slaMinor === 1
                      ? " hour"
                      : " hours"
                    : ""}
                </strong>
              </ListGroup.Item>
              <h3>Contact Delivery Manager:</h3>
              <Form onSubmit={handleSendMessage}>
                <Form.Group controlId="comment">
                  <Form.Label>Send message</Form.Label>
                  <Form.Control
                    style={{ minHeight: "90px" }}
                    placeholder="Your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    as="textarea"
                    rows={3}
                    onKeyPress={handleEnterSendMessage}
                  ></Form.Control>
                </Form.Group>
                {sendMessageLoading ? (
                  <Loader />
                ) : (
                  <Button type="submit" variant="primary" disabled={false}>
                    Send
                  </Button>
                )}
              </Form>
            </ListGroup>
          </Col>
          <Col md={6}>
            <ListGroup variant="flush">
              <h3>Comments:</h3>
              <ListGroup.Item>
                {/** SECOND SERVICE MAP */}
                {service.report.map((review) => (
                  <Review review={review} />
                ))}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ServiceScreen;
