import React, { useState, useEffect } from "react";
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
import ReactLazyLoad from "../components/ReactLazyLoad";

const ServiceScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [random1or2, setRandom1or2y] = useState(1);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const [chartPicked, setChartPicked] = useState("BarChart");

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

  const arrayBufferToBase64 = (buffer) => {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log("What picked?" + chartPicked);
  };

  const handleImageCreation = ({ review }) => {
    console.log("handleImageCreation");
    console.log(review);
    console.log("img size");
    console.log(review.img.naturalWidth);
    console.log(review.img.naturalHeight);

    let base64Flag = `data:${review.img.contentType};base64,`;
    let imageStr = arrayBufferToBase64(review.img.data.data);
    let img = "";
    img = base64Flag + imageStr;
    return img;
  };

  useEffect(() => {
    setRandom1or2y(Math.floor(Math.random() * 10) + 1);
    dispatch(listServiceDetails(match.params.id));
  }, [match, dispatch]);

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
              {/*TODO: Build a real breach check */}
              {random1or2 > 6 ? (
                <Message variant="danger">
                  <Row>SLA Breached</Row>
                  <Row>15:03 Wednesday, 17 February 2021 (GMT)</Row>
                  <Row>Estimated Penalty:</Row>
                  <Row>£1.000</Row>
                </Message>
              ) : (
                <></>
              )}

              <ListGroup.Item>
                <span>Major Downtime Breach: </span>
                <span>2 hours</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span>Minor Downtime Breach: </span>
                <span>2 hours</span>
              </ListGroup.Item>
              <h3>Contact Delivery Manager:</h3>
              <Form onSubmit={handleSendMessage}>
                <Form.Group controlId="comment">
                  <Form.Label>Send message</Form.Label>
                  <Form.Control
                    placeholder="Your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    as="textarea"
                    rows={3}
                  ></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary" disabled={false}>
                  Send
                </Button>
              </Form>
            </ListGroup>
          </Col>
          <Col md={6}>
            <ListGroup variant="flush">
              <h3>Comments:</h3>
              <ListGroup.Item>
                {service.report.map((review) => (
                  <>
                    {review.comment && (
                      <ListGroup.Item key={review._id}>
                        {review.comment && (
                          <>
                            <Row>
                              <strong>
                                {review.createdAt.substring(0, 10)}
                              </strong>
                            </Row>

                            <Row>
                              <span key={review._id + 4}>{review.comment}</span>
                            </Row>
                          </>
                        )}
                        {review.hasOwnProperty("img") && (
                          <Image src={handleImageCreation({ review })} fluid />
                        )}
                      </ListGroup.Item>
                    )}
                  </>
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
