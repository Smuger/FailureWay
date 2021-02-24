import React, { useState, useEffect, useRef } from "react";
import { ChatItem, MessageBox } from "react-chat-elements";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import "react-chat-elements/dist/main.css";
import Avatar from "react-avatar";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { getUserMessages } from "../actions/userActions";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
};

const MessagesScreen = ({ location, history }) => {
  const [message, setMessage] = useState([]);
  const [firstScreen, setFirstScreen] = useState(true);

  const userMessages = useSelector((state) => state.userMessages);
  const { loading, error, messageBank } = userMessages;

  console.log(messageBank);
  if (messageBank) {
    console.log(messageBank.user.messageBank);
  }

  const dispatch = useDispatch();
  const submitHandler = () => {};

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    dispatch(getUserMessages());
    scrollToBottom();
    if (messageBank) {
      if (
        JSON.stringify(message) !== JSON.stringify(messageBank.user.messageBank)
      ) {
        setMessage(messageBank.user.messageBank);
      }
    }
  }, []);

  useInterval(() => {
    dispatch(getUserMessages());
  }, 20000);

  return (
    <>
      <Container style={{ overflowY: "scroll", height: "70vh" }}>
        <Row>
          {message.length === 0 && <h1>You have no messages</h1>}
          {message.map((conv) => (
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
                  title={`${conv.recipientName}`}
                  subtitle={
                    conv.messagesForThatUser[
                      conv.messagesForThatUser.length - 1
                    ].message
                  }
                  date={new Date(conv.updatedAt)}
                  unread={0}
                  letterItem={{
                    letter: conv.recipientName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toLowerCase(),
                    id: 1,
                  }}
                  onClick={() => setFirstScreen(false)}
                />
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default MessagesScreen;
