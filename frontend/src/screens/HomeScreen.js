import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector, connect } from "react-redux";
import Product from "../components/Product";
import Chart from "../components/Chart";
import Message from "../components/Message";
import Loader from "../components/Loader";
//import { listProducts } from "../actions/productActions";
import { listServices } from "../actions/serviceActions";

const HomeScreen = ({ history }) => {
  const dispatch = useDispatch();

  //const productList = useSelector((state) => state.productList);
  const serviceList = useSelector((state) => state.serviceList);
  //const { loading, error, products } = productList;
  //console.log("LOOK AT" + JSON.stringify(serviceList));
  const { loading, error, services } = serviceList;

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const redirect = "/login";

  // useEffect(() => {
  //   dispatch(listProducts());
  // }, [dispatch]);

  useEffect(() => {
    dispatch(listServices());
    if (userInfo === null) {
      history.push(redirect);
    }
  }, [dispatch]);

  return (
    <>
      <h1>Daily Cumulative Interruption</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {services.map((service) => (
            <Col key={service._id} sm={6} md={6} lg={6} xl={6}>
              <Chart service={service} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
