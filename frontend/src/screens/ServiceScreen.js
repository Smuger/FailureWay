import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Chart from "../components/Chart";
import { listServiceDetails } from "../actions/serviceActions";
import ReactLazyLoad from "../components/ReactLazyLoad";

const ServiceScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const serviceDetails = useSelector((state) => state.serviceDetails);
  const { loading, error, service } = serviceDetails;

  const arrayBufferToBase64 = (buffer) => {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };

  const handleImageCreation = ({ review }) => {
    console.log("handleImageCreation");
    console.log(review);
    console.log("img size");
    console.log(review.img.naturalWidth);
    console.log(review.img.naturalHeight);

    let base64Flag = `data:${review.img.contentType};base64,`;
    let imageStr = arrayBufferToBase64(review.img.data.data);
    let img = "";
    img = base64Flag + imageStr;
    return img;
  };

  useEffect(() => {
    dispatch(listServiceDetails(match.params.id));
  }, [match, dispatch]);

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Chart service={service} />
          </Col>
          <Col md={6}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>Comments:</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                {service.report.map((review) => (
                  <>
                    {review.comment && (
                      <ListGroup.Item key={review._id}>
                        {review.comment && (
                          <>
                            <Row>
                              <strong>
                                {review.createdAt.substring(0, 10)}
                              </strong>
                            </Row>

                            <Row>
                              <span>{review.comment}</span>
                            </Row>
                          </>
                        )}
                        {review.hasOwnProperty("img") && (
                          <Image src={handleImageCreation({ review })} fluid />
                        )}
                      </ListGroup.Item>
                    )}
                  </>
                ))}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ServiceScreen;
