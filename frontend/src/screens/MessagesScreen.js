import React, { useState, useEffect, useRef } from "react";
import { ChatItem, MessageBox } from "react-chat-elements";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import "react-chat-elements/dist/main.css";
import Avatar from "react-avatar";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { getUserMessages } from "../actions/userActions";
import { Link } from "react-router-dom";

const MessagesScreen = ({ location, history }) => {
  const [message, setMessage] = useState("");
  const [firstScreen, setFirstScreen] = useState(true);

  const userMessages = useSelector((state) => state.userMessages);
  const { loading, error, messageBank } = userMessages;

  const dispatch = useDispatch();
  const submitHandler = () => {};

  const letters = { letter: "sd", id: 1 };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    dispatch(getUserMessages());
    scrollToBottom();
  }, []);

  return (
    <>
      <Container style={{ overflowY: "scroll", height: "70vh" }}>
        <Row>
          {messageBank !== undefined &&
            messageBank.messageBank.length === 0 &&
            messageBank.messageBank.length === 0 && (
              <h1>You have no messages</h1>
            )}
          {messageBank !== undefined ? (
            messageBank.messageBank.map((conv) => (
              <Col
                md={{ span: 6, offset: 3 }}
                style={{ backgroundColor: "#FFC100" }}
                key={conv._id}
              >
                <Link
                  to={`/messages/${conv.recipient}`}
                  style={{ textDecoration: "none" }}
                >
                  <ChatItem
                    alt={"Reactjs"}
                    title={`${conv.recipient}`}
                    subtitle={
                      conv.messagesForThatUser[
                        conv.messagesForThatUser.length - 1
                      ].message
                    }
                    date={new Date()}
                    unread={0}
                    letterItem={letters}
                    onClick={() => setFirstScreen(false)}
                  />
                </Link>
              </Col>
            ))
          ) : (
            <h1>You have no messages</h1>
          )}
        </Row>
      </Container>
    </>
  );
};

export default MessagesScreen;
