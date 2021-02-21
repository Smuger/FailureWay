import React, { useState, useEffect, useRef } from "react";
import { ChatItem, MessageBox } from "react-chat-elements";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import "react-chat-elements/dist/main.css";
import Avatar from "react-avatar";
import FormContainer from "../components/FormContainer";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ChatScreen = ({ location, history }) => {
  const [message, setMessage] = useState("");
  const [firstScreen, setFirstScreen] = useState(true);

  const dispatch = useDispatch();

  const userMessages = useSelector((state) => state.userMessages);
  const { loading, error, messageBank } = userMessages;

  console.log("TEST");
  console.log(messageBank);

  const submitHandler = () => {};

  const letters = { letter: "sd", id: 1 };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <>
      <Link className="btn btn-dark my-3" to="/messages">
        Go Back
      </Link>
      <Container
        style={{
          overflowY: "scroll",
          height: "50vh",
          border: "1px solid rgba(0,0,0,.125)",
          backgroundColor: "#333",
        }}
      >
        <Row>
          <Col md={{ span: 5, offset: 6 }}>
            <MessageBox
              position={"right"}
              type={"text"}
              text={"I would like to talk to you about our last service falure"}
            />
          </Col>
        </Row>
        <Row>
          <Col
            md={{ span: 5, offset: 1 }}
            style={{ backgroundColor: "#FFC100" }}
          >
            <MessageBox
              position={"left"}
              type={"text"}
              text={"I am glad that you connected me."}
            />
          </Col>
        </Row>
        <Row>
          <Col
            md={{ span: 5, offset: 1 }}
            style={{ backgroundColor: "#FFC100" }}
          >
            <MessageBox
              position={"left"}
              type={"text"}
              text={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pretium, nisl eu sodales molestie, nunc nibh luctus purus, et rutrum dolor neque in nibh. Etiam sed lectus id elit lacinia sagittis porta non ligula."
              }
            />
          </Col>
        </Row>
        <Row>
          <Col
            md={{ span: 5, offset: 1 }}
            style={{ backgroundColor: "#FFC100" }}
          >
            <MessageBox
              position={"left"}
              type={"text"}
              text={
                "Pellentesque sit amet ipsum eu purus suscipit egestas. Donec sit amet hendrerit sem. Pellentesque ultricies metus nec finibus dapibus. Duis vel nulla et velit tempor commodo."
              }
            />
          </Col>
        </Row>
        <Row>
          <Col
            md={{ span: 5, offset: 1 }}
            style={{ backgroundColor: "#FFC100" }}
          >
            <MessageBox
              position={"left"}
              type={"text"}
              text={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam elementum tortor accumsan, molestie nulla et, dictum risus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;"
              }
            />
          </Col>
        </Row>
        <Row>
          <Col
            md={{ span: 5, offset: 1 }}
            style={{ backgroundColor: "#FFC100" }}
          >
            <MessageBox
              position={"left"}
              type={"text"}
              text={
                "Maecenas lobortis pretium est sit amet tincidunt. Cras at mauris est."
              }
            />
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 5, offset: 6 }}>
            <MessageBox
              position={"right"}
              type={"text"}
              text={
                "Aenean nisl justo, tempor quis velit ac, pulvinar volutpat risus. In convallis malesuada nulla, at venenatis turpis auctor quis."
              }
            />
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 5, offset: 6 }} ref={messagesEndRef}>
            <MessageBox
              position={"right"}
              type={"text"}
              text={
                "Quisque dapibus massa et tortor eleifend suscipit. Aenean imperdiet justo vitae sapien fermentum egestas. Donec eget odio eros. Nullam eu justo nulla. Proin et sodales neque. Praesent finibus, ligula non laoreet tempus, sem ex laoreet enim, ac ultrices sem tortor."
              }
            />
          </Col>
        </Row>
      </Container>
      <FormContainer>
        <Form onSubmit={submitHandler} style={{ marginTop: "1rem" }}>
          <Form.Group controlId="name">
            <Form.Control
              placeholder="Your response"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              as="textarea"
              rows={3}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Send
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ChatScreen;
