import React, { useState, useEffect, useRef, useCallback } from "react";

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
//import io from "socket.io-client";
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

//const socket = io.connect("http://localhost:4000");

const ChatScreen = ({ location, history, match }) => {
  const [message, setMessage] = useState("");
  const [firstScreen, setFirstScreen] = useState(true);
  const [reciepientsName, setReciepientsName] = useState("");
  const [reciepientsInitials, setReciepientsInitials] = useState({
    letter: " ",
    id: 1,
  });
  const [messagesForThatUser, setMessagesForThatUser] = useState([]);
  const [userID, setUserID] = useState("");

  // const [state, setState] = useState({ message: "", name: "" });
  // const [chat, setChat] = useState([]);

  // const renderChat = () => {
  //   return chat.map(({ name, message }, index) => (
  //     <div key={index}>
  //       <h3>
  //         {name} and {message}
  //       </h3>
  //     </div>
  //   ));
  // };

  // useEffect(() => {
  //   socket.on("message", ({ name, message }) => {
  //     setChat([...chat, { name, message }]);
  //   });
  // });

  // const messageSubmit = (e) => {
  //   e.preventDefault();
  //   const { name, message } = state;
  //   socket.emit("message", { name, message });
  //   setState({ message: "", name });
  // };

  const dispatch = useDispatch();

  const userMessages = useSelector((state) => state.userMessages);
  const { loading, success, messageBank } = userMessages;

  if (messageBank) {
    let test = messageBank.user.messageBank.filter((value) => {
      return value._id === match.params.id;
    });
  }

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const messageToSend = {
    recipient: match.params.id,
    message: message,
  };

  useInterval(() => {
    dispatch(getUserMessages());
  }, 5000);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.replace(/\s/g, "") !== "") {
      dispatch(postUserMessage(messageToSend));
      setMessage("");

      var list = document.getElementById("myDiv");
      list.scrollTop = list.offsetHeight;
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
        }
      }
    }
  };

  useEffect(() => {
    dispatch(getUserMessages());
  }, []);

  useEffect(() => {

    if (messageBank) {
      if (reciepientsInitials.letter === " ") {
        setReciepientsInitials({
          letter: messageBank.user.messageBank
            .filter((value) => {
              return value.recipient === match.params.id;
            })[0]
            .recipientName.split(" ")
            .map((n) => n[0])
            .join("")
            .toLowerCase(),
          id: 1,
        });
      }

      if (reciepientsName === "") {
        setReciepientsName(
          messageBank.user.messageBank.filter((value) => {
            return value.recipient === match.params.id;
          })[0].recipientName
        );
      }

      let newMessages = messageBank.user.messageBank.filter((value) => {
        return value.recipient === match.params.id;
      })[0].messagesForThatUser;

      if (JSON.stringify(newMessages) !== JSON.stringify(messagesForThatUser)) {


        setMessagesForThatUser(newMessages);
      }

    }
    if (userInfo) {
      if (userID === "") {
        setUserID(userInfo._id);
      }
    }
  }, [
    match,
    dispatch,
    messageBank,
    userInfo,
    messagesForThatUser,
    reciepientsInitials,
    reciepientsName,
  ]);

  return (
    <>
      <Col md={{ span: 6 }}>
        <Row>
          <ChatItem
            alt={"Account"}
            title={reciepientsName}
            date={""}
            unread={0}
            letterItem={reciepientsInitials}
          />
        </Row>
      </Col>

      <Container
        style={{
          overflowY: "scroll",
          height: "65vh",
          border: "1px solid rgba(0,0,0,.125)",
        }}
        id={"myDiv"}
      >
        <ScrollDown messages={messagesForThatUser} userID={userID} />
      </Container>
      <FormContainer>
        <Form onSubmit={handleSendMessage} style={{ marginTop: "1rem" }}>
          <Form.Group controlId="name">
            <Form.Control
              style={{ minHeight: "90px" }}
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
