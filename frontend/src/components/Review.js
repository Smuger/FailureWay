import React, { useState, useCallback } from "react";
import { Alert } from "react-bootstrap";
import { Controlled as ControlledZoom } from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import {
  Form,
  Button,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
} from "react-bootstrap";

const Review = ({ review }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleImageCreation = ({ review }) => {
    let base64Flag = `data:${review.img.contentType};base64,`;
    let imageStr = arrayBufferToBase64(review.img.data.data);
    let img = "";
    img = base64Flag + imageStr;
    return img;
  };

  const arrayBufferToBase64 = (buffer) => {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };

  const handleImgLoad = useCallback(() => {
    setIsZoomed(true);
  }, []);

  const handleZoomChange = useCallback((shouldZoom) => {
    setIsZoomed(shouldZoom);
  }, []);
  if (review.hasOwnProperty("img")) {
    return (
      <ListGroup.Item key={review._id}>
        <Row>
          <strong>{review.createdAt.substring(0, 10)}</strong>
        </Row>
        <Row>
          <p>{review.comment}</p>
        </Row>

        <Row>
          <ControlledZoom isZoomed={isZoomed} onZoomChange={handleZoomChange}>
            <Image src={handleImageCreation({ review })} fluid />
          </ControlledZoom>
        </Row>
      </ListGroup.Item>
    );
  } else {
    if (review.comment !== "") {
      return (
        <ListGroup.Item key={review._id}>
          <Row>
            <strong>{review.createdAt.substring(0, 10)}</strong>
          </Row>

          <Row>
            <p>{review.comment}</p>
          </Row>
        </ListGroup.Item>
      );
    }
  }
};

export default Review;
