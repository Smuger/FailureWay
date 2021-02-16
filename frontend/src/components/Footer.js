import React, { useState, useEffect } from "react";
import { Col, Container } from "react-bootstrap";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState("");

  useEffect(() => {
    setCurrentYear(new Date().toISOString().substr(0, 4));
  });
  return (
    <footer>
      <Container>
        <Col className="text-center py-3">
          FailureWay {currentYear} by Krzysztof Kwietniewski
        </Col>
      </Container>
    </footer>
  );
};

export default Footer;
