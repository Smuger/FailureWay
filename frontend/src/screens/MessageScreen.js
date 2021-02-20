import React, { useState, useEffect } from "react";
import { ChatItem, MessageBox } from "react-chat-elements";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import "react-chat-elements/dist/main.css";
import Avatar from "react-avatar";
import FormContainer from "../components/FormContainer";

const MessageScreen = ({ location, history }) => {
  const [message, setMessage] = useState("");
  const [firstScreen, setFirstScreen] = useState(true);

  const submitHandler = () => {};

  const letters = { letter: "sd", id: 1 };
  return (
    <>
      {firstScreen ? (
        <Container style={{ overflowY: "scroll", height: "100vh" }}>
          <Row>
            <Col
              md={{ span: 6, offset: 3 }}
              style={{ backgroundColor: "#333" }}
            >
              <ChatItem
                alt={"Reactjs"}
                title={"Facebook"}
                subtitle={"What are you doing?"}
                date={new Date()}
                unread={0}
                letterItem={letters}
                onClick={() => setFirstScreen(false)}
              />
            </Col>{" "}
            <Col
              md={{ span: 6, offset: 3 }}
              style={{ backgroundColor: "#333" }}
            >
              <ChatItem
                alt={"Reactjs"}
                title={"Facebook"}
                subtitle={"What are you doing?"}
                date={new Date()}
                unread={0}
                letterItem={letters}
                onClick={() => setFirstScreen(false)}
              />
            </Col>{" "}
            <Col
              md={{ span: 6, offset: 3 }}
              style={{ backgroundColor: "#333" }}
            >
              <ChatItem
                alt={"Reactjs"}
                title={"Facebook"}
                subtitle={"What are you doing?"}
                date={new Date()}
                unread={0}
                letterItem={letters}
                onClick={() => setFirstScreen(false)}
              />
            </Col>{" "}
            <Col
              md={{ span: 6, offset: 3 }}
              style={{ backgroundColor: "#333" }}
            >
              <ChatItem
                alt={"Reactjs"}
                title={"Facebook"}
                subtitle={"What are you doing?"}
                date={new Date()}
                unread={0}
                letterItem={letters}
                onClick={() => setFirstScreen(false)}
              />
            </Col>
          </Row>
        </Container>
      ) : (
        <>
          <Container style={{ overflowY: "scroll", height: "50vh" }}>
            <Row>
              <Col
                md={{ span: 5, offset: 6 }}
                style={{ backgroundColor: "#333" }}
              >
                <MessageBox
                  position={"right"}
                  type={"text"}
                  text={
                    "I would like to talk to you about our last service falure"
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
                  text={"I am glad that you connected me."}
                />
              </Col>
            </Row>
            <Row>
              <Col
                md={{ span: 5, offset: 6 }}
                style={{ backgroundColor: "#333" }}
              >
                <MessageBox
                  position={"right"}
                  type={"text"}
                  text={
                    "I would like to talk to you about our last service falure"
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col
                md={{ span: 5, offset: 6 }}
                style={{ backgroundColor: "#333" }}
              >
                <MessageBox
                  position={"right"}
                  type={"text"}
                  text={
                    "I would like to talk to you about our last service falure"
                  }
                />
              </Col>
            </Row>
          </Container>
          <FormContainer>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Message:</Form.Label>
                <Form.Control
                  placeholder="Describe how this downtime affected you"
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
      )}
    </>
  );
};

export default MessageScreen;
