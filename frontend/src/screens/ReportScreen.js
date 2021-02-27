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
import Resizer from "react-image-file-resizer";

const ReportScreen = ({ location, history }) => {
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
  const [commentMessage, setCommentMessage] = useState("");
  const dispatch = useDispatch();

  const serviceList = useSelector((state) => state.serviceList);
  const { loading, error, services } = serviceList;

  const serviceUpdate = useSelector((state) => state.serviceUpdate);
  const sendingDataSuccess = serviceUpdate.success;
  const sendingDataError = serviceUpdate.error;
  const sendingLoading = serviceUpdate.loading;

  useEffect(() => {
    if (sendingDataSuccess) {
      if (servicePicked === "") {
        history.push(`/services/${services[0]._id}`);
      } else {
        history.push(`/services/${servicePicked}`);
      }
    }
  }, [
    servicePicked,
    sendingDataSuccess,
  ]);

  useEffect(() => {
    dispatch(listServices());
  }, []);

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1024,
        1024,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });

  const onChange = async (event) => {
    try {
      const file = event.target.files[0];
      const image = await resizeFile(file);
    } catch (err) {
      console.err(err);
    }
  };

  const imageUploadHandler = async (picture) => {
    setUploading(true);
    const file = picture[0];

    if (file) {
      try {
        const image = await resizeFile(file);

        const formData = new FormData();
        formData.append("image", image);

        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        const { data } = await axios.post("/api/upload", formData, config);
        setUploading(false);
        setImage(data);
      } catch (error) {
        setUploading(false);
        console.error(error);
      }
    }
    setUploading(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (comment.replace(/\s/g, "") === "") {
      setCommentMessage("Comment is required");
    } else {
      setCommentMessage("");
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
    }
  };

  return (
    <FormContainer>
      <h1>Report issue</h1>
      {message && <Message variant="info">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {sendingDataError && (
        <Message variant="danger">{sendingDataError}</Message>
      )}
      <Form onSubmit={submitHandler}>
        {/* CHOOSE SERVICE */}
        <Form.Group controlId="service">
          <Form.Label>Service</Form.Label>

          {services.length > 0 ? (
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
          ) : (
            <Loader />
          )}
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
              style={{ margin: "auto" }}
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
              style={{ flexWrap: "wrap", margin: "auto" }}
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

        {/* UPLOAD IMAGE */}
        <Form.Group controlId="image">
          {uploading && <Loader />}
          <ImageUploader
            labelStyles={{ fontFamily: "Segoe UI" }}
            buttonStyles={{ background: "#1863e6" }}
            label={"Max file size: 5mb, accepted formats: jpg / jpge / png"}
            withIcon={true}
            onChange={imageUploadHandler}
            imgExtension={[".jpg", ".jpeg", ".png"]}
            maxFileSize={5242880}
            singleImage={true}
            withPreview={true}
          />
        </Form.Group>

        {/* COMMENT */}
        <Form.Group controlId="comment">
          <Form.Label>Comment</Form.Label>
          <Form.Control
            style={{ minHeight: "90px" }}
            placeholder="Describe how this downtime affected you"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            as="textarea"
            rows={3}
          ></Form.Control>
        </Form.Group>
        {commentMessage && <Message variant="danger">{commentMessage}</Message>}
        {sendingLoading && <Message variant="info">Please wait</Message>}
        <Button type="submit" variant="primary" disabled={uploading}>
          Submit
        </Button>
      </Form>
    </FormContainer>
  );
};

// {/* UPLOAD ZONE TEST */}
// <Form.Group controlId="image">
// <Form.Label>Image</Form.Label>
// <UploadZone />
// </Form.Group>

// {/* UPLOAD IMAGE */}
// <Form.Group controlId="image">
// <Form.Label>Image</Form.Label>
// <Form.Control
//   type="text"
//   placeholder="Enter image url"
//   value={image}
//   onChange={(e) => setImage(e.target.value)}
// ></Form.Control>
// <Form.File
//   id="image-file"
//   label="Choose File"
//   custom
//   onChange={uploadFileHandler}
// ></Form.File>
// {uploading && <Loader />}
// </Form.Group>

export default ReportScreen;
