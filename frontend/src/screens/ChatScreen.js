import React, { useState, useEffect, useRef } from "react";

import { Row, Col, Container, Form, Button } from "react-bootstrap";
import "react-chat-elements/dist/main.css";
import Avatar from "react-avatar";
import FormContainer from "../components/FormContainer";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserMessages, postUserMessage } from "../actions/userActions";
import { animateScroll } from "react-scroll";
import ScrollDown from "../components/ScrollDown";
import { ChatItem, MessageBox } from "react-chat-elements";

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

const ChatScreen = ({ location, history, match }) => {
  const [message, setMessage] = useState("");
  const [firstScreen, setFirstScreen] = useState(true);

  const dispatch = useDispatch();

  const userMessages = useSelector((state) => state.userMessages);
  const { loading, success, messageBank } = userMessages;

  console.log("MATCH PARAM");
  console.log(match.params.id);

  if (messageBank) {
    let test = messageBank.messageBank.filter((value) => {
      return value._id === match.params.id;
    });
    console.log("filter test");
    console.log(test);
  }

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const messageToSend = {
    recipient: match.params.id,
    message: message,
  };

  useInterval(() => {
    dispatch(getUserMessages());
  }, 20000);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.replace(/\s/g, "") !== "") {
      dispatch(postUserMessage(messageToSend));
      setMessage("");

      var list = document.getElementById("myDiv");
      list.scrollTop = list.offsetHeight;
      console.log("getUserMessages dispatched again");
    }
  };

  const handleEnterSendMessage = (e) => {
    if (e.key === "Enter") {
      if (!e.shiftKey) {
        e.preventDefault();
        if (message.replace(/\s/g, "") !== "") {
          dispatch(postUserMessage(messageToSend));
          setMessage("");

          var list = document.getElementById("myDiv");
          list.scrollTop = list.offsetHeight;
          console.log("getUserMessages dispatched again");
        }
      }
    }
  };

  const letters = {
    letter: "sd",
    id: 1,
  };

  if (messageBank) {
    letters.letter = messageBank.messageBank
      .filter((value) => {
        return value.recipient === match.params.id;
      })[0]
      .recipientName.split(" ")
      .map((n) => n[0])
      .join("")
      .toLowerCase();
  }

  useEffect(() => {
    dispatch(getUserMessages());
  }, [match, dispatch]);

  return (
    <>
      {messageBank && (
        <Col md={{ span: 6, offset: 1 }}>
          <Row>
            <ChatItem
              alt={"Account"}
              title={`${
                messageBank.messageBank.filter((value) => {
                  return value.recipient === match.params.id;
                })[0].recipientName
              }`}
              date={""}
              unread={0}
              letterItem={letters}
            />
          </Row>
        </Col>
      )}
      <Container
        style={{
          overflowY: "scroll",
          height: "65vh",
          border: "1px solid rgba(0,0,0,.125)",
        }}
        id={"myDiv"}
      >
        {messageBank && (
          <ScrollDown
            messages={
              messageBank.messageBank.filter((value) => {
                return value.recipient === match.params.id;
              })[0].messagesForThatUser
            }
            userInfo={userInfo}
          />
        )}
      </Container>
      <FormContainer>
        <Form onSubmit={handleSendMessage} style={{ marginTop: "1rem" }}>
          <Form.Group controlId="name">
            <Form.Control
              placeholder="Your response"
              value={message}
              onKeyPress={handleEnterSendMessage}
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

{
  /* <Link className="btn btn-dark my-3" to="/messages">
        Go Back
      </Link> */
}
export default ChatScreen;
