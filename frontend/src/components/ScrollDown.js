import React, { useEffect, useRef } from "react";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { ChatItem, MessageBox } from "react-chat-elements";

const ScrollDown = ({ messages, userID }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "auto" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div>
      {messages.map((conv) => (
        <Row key={conv._id}>
          {conv.recipient === userID ? (
            <Col md={{ span: 5, offset: 1 }}>
              <MessageBox
                position={"left"}
                type={"text"}
                text={conv.message}
                date={new Date(conv.createdAt)}
                style={{ background: "#333" }}
              />
            </Col>
          ) : (
            <Col md={{ span: 5, offset: 6 }}>
              <MessageBox
                position={"right"}
                type={"text"}
                text={conv.message}
                date={new Date(conv.createdAt)}
                style={{ background: "#333" }}
              />
            </Col>
          )}
        </Row>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ScrollDown;
