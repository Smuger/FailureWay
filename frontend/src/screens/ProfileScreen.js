import React, { useState, useEffect, useCallback } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import ReviewProfile from "../components/ReviewProfile";

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.userProfile);
  const { userDetails, loading } = userProfile;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!userDetails) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(userDetails.name);
        setEmail(userDetails.email);
      }
    }
  }, [userInfo, dispatch, history, userDetails]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({ id: userDetails._id, name, email, password })
      );
    }
  };

  const commentHandler = (review) => {};

  return (
    <Row>
      <Col md={3}>
        <h1>Sign UP</h1>
        {message && <Message variant="danger">{message}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Change Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        Reported issues:
        {loading ? (
          <Loader />
        ) : (
          <ListGroup variant="flush">
            {userDetails ? (
              userDetails.reportsFromThatUser.length > 0 && (
                <ListGroup.Item>
                  {/** SECOND SERVICE MAP */}
                  {userDetails.reportsFromThatUser.map((review) => (
                    <ReviewProfile review={review} />
                  ))}
                </ListGroup.Item>
              )
            ) : (
              <h1>No reported issues</h1>
            )}
          </ListGroup>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
