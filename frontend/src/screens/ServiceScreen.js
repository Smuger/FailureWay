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

const ServiceScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const serviceDetails = useSelector((state) => state.serviceDetails);
  const { loading, error, service } = serviceDetails;

  useEffect(() => {
    dispatch(listServiceDetails(match.params.id));
  }, [match, dispatch]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

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
              {service ? (
                <ListGroup.Item>
                  {service.report.map((review) => (
                    <>
                      {" "}
                      {review.comment && review.createdAt ? (
                        <ListGroup.Item key={review._id}>
                          <Row>
                            <strong>{review.createdAt.substring(0, 10)}</strong>
                          </Row>
                          <Row>
                            <p>{review.comment}</p>
                          </Row>
                        </ListGroup.Item>
                      ) : (
                        <></>
                      )}
                    </>
                  ))}
                </ListGroup.Item>
              ) : (
                <p>No comments</p>
              )}
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ServiceScreen;
