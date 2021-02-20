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
              style={{ backgroundColor: "#FFC100" }}
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
              style={{ backgroundColor: "#FFC100" }}
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
              style={{ backgroundColor: "#FFC100" }}
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
              style={{ backgroundColor: "#FFC100" }}
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
          <Container
            style={{
              overflowY: "scroll",

              height: "50vh",
              border: "1px solid rgba(0,0,0,.125)",
            }}
          >
            <Row>
              <Col
                md={{ span: 5, offset: 6 }}
                style={{ backgroundColor: "#FFC100" }}
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
                style={{ backgroundColor: "#333" }}
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
                style={{ backgroundColor: "#333" }}
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
                style={{ backgroundColor: "#333" }}
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
                style={{ backgroundColor: "#333" }}
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
                style={{ backgroundColor: "#333" }}
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
                style={{ backgroundColor: "#FFC100" }}
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
                style={{ backgroundColor: "#FFC100" }}
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
      )}
    </>
  );
};

export default MessageScreen;
