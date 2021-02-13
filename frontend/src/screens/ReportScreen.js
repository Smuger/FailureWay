import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Button,
  Row,
  Col,
  ListGroup,
  ToggleButton,
} from "react-bootstrap";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { createServiceReview, listServices } from "../actions/serviceActions";

const ReportScreen = ({ location, history }) => {
  // TODO: Replace this with services from DB
  //const services = ["Service A", "Service B", "Service C"];

  const [servicePicked, setServicePicked] = useState("");
  const [severity, setSeverity] = useState(0);
  const [downtime, setDowntime] = useState(1);
  const [minor, setMinor] = useState(0);
  const [major, setMajor] = useState(0);
  const [comment, setComment] = useState("");
  const [allServicesNames, setAllServicesNames] = useState([]);

  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const serviceList = useSelector((state) => state.serviceList);

  const { loading, error, services } = serviceList;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    dispatch(listServices());
  }, [dispatch, location, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(
      "FORM: " + servicePicked + "|" + severity + "|" + downtime + "|" + comment
    );
    console.log("OBJECT" + JSON.stringify(severity));

    // Turn on after testing
    if (servicePicked === "") {
      dispatch(
        createServiceReview(services[0]._id, { severity, downtime, comment })
      );
    } else {
      dispatch(
        createServiceReview(servicePicked, { severity, downtime, comment })
      );
    }
    history.push(redirect);
  };

  return (
    <FormContainer>
      <h1>Report issue</h1>
      {message && <Message variant="info">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      <Form onSubmit={submitHandler}>
        {/* CHOOSE SERVICE */}
        <Form.Group controlId="service">
          <Form.Label>Service</Form.Label>
          <Form.Control
            as="select"
            value={servicePicked}
            onChange={(e) => setServicePicked(e.target.value)}
          >
            {services.map((service) => (
              <option key={service._id} value={service._id}>
                {service.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        {/* CHOOSE SEVERITY RADIO CHECK */}
        <Form.Group controlId="severity">
          <Row>
            <Form.Label>Severity</Form.Label>
          </Row>
          <Row>
            <ToggleButtonGroup
              type="radio"
              name="options"
              defaultValue={0}
              onChange={(selected) => setSeverity(selected)}
            >
              <ToggleButton value={0}>Minor issues</ToggleButton>
              <ToggleButton value={1}>Major issues</ToggleButton>
            </ToggleButtonGroup>
          </Row>
        </Form.Group>

        {/* CHOOSE DOWNTIME RADIO CHECK */}
        <Form.Group controlId="downtime">
          <Row>
            <Form.Label>Downtime</Form.Label>
          </Row>
          <Row>
            <ToggleButtonGroup
              type="radio"
              name="options"
              defaultValue={1}
              rows={3}
              style={{ flexWrap: "wrap" }}
              onChange={(selected) => setDowntime(selected)}
            >
              <ToggleButton value={1}>1h</ToggleButton>
              <ToggleButton value={2}>2h</ToggleButton>
              <ToggleButton value={3}>3h</ToggleButton>
              <ToggleButton value={4}>4h</ToggleButton>
              <ToggleButton value={5}>5h</ToggleButton>
              <ToggleButton value={6}>6h</ToggleButton>
              <ToggleButton value={7}>7h</ToggleButton>
              <ToggleButton value={8}>Day</ToggleButton>
            </ToggleButtonGroup>
          </Row>
        </Form.Group>

        {/* COMMENT */}
        <Form.Group controlId="comment">
          <Form.Label>Comment</Form.Label>
          <Form.Control
            placeholder="Describe how this downtime affected you"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            as="textarea"
            rows={3}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ReportScreen;
