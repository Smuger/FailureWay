import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector, connect } from "react-redux";
import Chart from "../components/Chart";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listServices } from "../actions/serviceActions";
import SearchBox from "../components/SearchBox";

const HomeScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const keyword = match.params.keyword;

  const serviceList = useSelector((state) => state.serviceList);

  const { loading, error, services } = serviceList;

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const redirect = "/login";

  useEffect(() => {
    dispatch(listServices(keyword));
    if (userInfo === null) {
      history.push(redirect);
    }
  }, [dispatch, keyword]);

  return (
    <>
      <SearchBox history={history} />
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
