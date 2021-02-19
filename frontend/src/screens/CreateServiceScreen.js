import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ImageUploader from "react-images-upload";
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
import ImageUpload from "../components/ImageUpload";
import UploadZone from "../components/UploadZone";
import FormContainer from "../components/FormContainer";
import {
  createService,
  createServiceReport,
  listServices,
} from "../actions/serviceActions";
import axios from "axios";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";

const CreateServiceScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [provider, setProvider] = useState("");
  const [message, setMessage] = useState("");
  const [minorSLA, setMinorSLA] = useState(5);
  const [majorSLA, setMajorSLA] = useState(5);

  const dispatch = useDispatch();

  const serviceCreated = useSelector((state) => state.serviceCreate);
  const { loading, error, success } = serviceCreated;

  const redirect = "/";

  console.log("success");
  console.log(success);

  if (success) {
    history.push(redirect);
  }

  useEffect(() => {}, [dispatch, location, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    // Turn on after testing
    if (name !== "" && provider !== "") {
      dispatch(createService({ name, provider, minorSLA, majorSLA }));
    } else {
      setMessage("Service name and service provider fields are required.");
    }
  };

  return (
    <FormContainer>
      <h1>Add Service</h1>
      {message && <Message variant="info">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      <Form onSubmit={submitHandler}>
        {/* CHOOSE NAME */}
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            placeholder="Service Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            rows={3}
          ></Form.Control>
        </Form.Group>

        {/* CHOOSE PROVIDER */}
        <Form.Group controlId="provider">
          <Form.Label>Provider</Form.Label>
          <Form.Control
            placeholder="Provider Name"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            type="text"
            rows={3}
          ></Form.Control>
        </Form.Group>

        {/* SLIDER */}
        <Form.Group controlId="provider">
          <Form.Label>Minor SLA</Form.Label>
          <Slider
            onChange={(value) => setMinorSLA(value)}
            min={1}
            max={8}
            defaultValue={5}
            marks={{ 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: "DAY" }}
          />
          <Col className="text-center">
            <small className="rc-slider-info">
              {minorSLA === 8 ? "Whole Day" : minorSLA}
              {minorSLA < 8 ? (minorSLA === 1 ? " hour" : " hours") : ""}
            </small>
          </Col>
        </Form.Group>

        {/* SLIDER */}
        <Form.Group controlId="provider">
          <Form.Label>Major SLA</Form.Label>
          <Slider
            onChange={(value) => setMajorSLA(value)}
            min={1}
            max={8}
            defaultValue={5}
            marks={{ 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: "DAY" }}
          />
          <Col className="text-center">
            <small className="rc-slider-info">
              {majorSLA === 8 ? "Whole Day" : majorSLA}
              {majorSLA < 8 ? (majorSLA === 1 ? " hour" : " hours") : ""}
            </small>
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary" disabled={loading}>
          Submit
        </Button>
      </Form>
    </FormContainer>
  );
};

export default CreateServiceScreen;
