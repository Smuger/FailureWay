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
import { register } from "../actions/userActions";

const ReportScreen = ({ location, history }) => {
  const [service, setService] = useState("");
  const [comment, setComment] = useState("");
  const [severity, setSeverity] = useState([1, 3]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);

  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, redirect, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    }
    dispatch(register(name, email, password));
  };

  return (
    <FormContainer>
      <h1>Report issue</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Service</Form.Label>
          <ListGroup.Item>
            <Form.Control
              as="select"
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              {["Service A", "Service B", "Service C"].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </Form.Control>
          </ListGroup.Item>
        </Form.Group>

        <Form.Group controlId="name">
          <Row>
            <Form.Label>Severity</Form.Label>
          </Row>
          <Row>
            <ToggleButtonGroup
              type="radio"
              name="options"
              defaultValue={1}
              onChange={(e, selected) => setPassword(selected)}
            >
              <ToggleButton value={1}>Minor issues</ToggleButton>
              <ToggleButton value={2}>Major issues</ToggleButton>
            </ToggleButtonGroup>
          </Row>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Downtime</Form.Label>
          <ButtonToolbar aria-label="Toolbar with button groups">
            <ButtonGroup className="mr-2" aria-label="First group">
              <Button>1h</Button> <Button>2h</Button> <Button>3h</Button>{" "}
              <Button>4h</Button>
            </ButtonGroup>
            <ButtonGroup className="mr-2" aria-label="Second group">
              <Button>5h</Button> <Button>6h</Button> <Button>7h</Button>
            </ButtonGroup>
            <ButtonGroup aria-label="Third group">
              <Button>Day</Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
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
