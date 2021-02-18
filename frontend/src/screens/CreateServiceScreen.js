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

const CreateServiceScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [provider, setProvider] = useState("");
  const [message, setMessage] = useState("");

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
      dispatch(createService({ name, provider }));
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

        <Button type="submit" variant="primary" disabled={loading}>
          Submit
        </Button>
      </Form>
    </FormContainer>
  );
};

export default CreateServiceScreen;
