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
import { createServiceReport, listServices } from "../actions/serviceActions";
import axios from "axios";

const CreateServiceScreen = ({ location, history }) => {
  const [servicePicked, setServicePicked] = useState("");
  const [severity, setSeverity] = useState(0);
  const [downtime, setDowntime] = useState(1);
  const [minor, setMinor] = useState(0);
  const [major, setMajor] = useState(0);
  const [comment, setComment] = useState("");
  const [allServicesNames, setAllServicesNames] = useState([]);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const serviceList = useSelector((state) => state.serviceList);
  const { loading, error, services } = serviceList;

  const serviceUpdate = useSelector((state) => state.serviceUpdate);
  const sendingDataSuccess = serviceUpdate.success;
  const sendingDataError = serviceUpdate.error;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  if (sendingDataSuccess) {
    history.push(redirect);
  }

  useEffect(() => {
    dispatch(listServices());
  }, [dispatch, location, history]);

  const imageUploadHandler = async (picture) => {
    console.log(picture[0]);
    const file = picture[0];
    //console.log(picture);
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // Turn on after testing
    if (servicePicked === "") {
      dispatch(
        createServiceReport(services[0]._id, {
          severity,
          downtime,
          comment,
          image,
        })
      );
    } else {
      dispatch(
        createServiceReport(servicePicked, {
          severity,
          downtime,
          comment,
          image,
        })
      );
    }
  };

  return (
    <FormContainer>
      <h1>Add Service</h1>
      {message && <Message variant="info">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {sendingDataError && (
        <Message variant="danger">{sendingDataError}</Message>
      )}
      <Form onSubmit={submitHandler}>
        {/* CHOOSE NAME */}
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            placeholder="Service Name"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            rows={3}
          ></Form.Control>
        </Form.Group>

        {/* CHOOSE PROVIDER */}
        <Form.Group controlId="provider">
          <Form.Label>Provider</Form.Label>
          <Form.Control
            placeholder="Provider Name"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            rows={3}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" disabled={uploading}>
          Submit
        </Button>
      </Form>
    </FormContainer>
  );
};

export default CreateServiceScreen;
