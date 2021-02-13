import {
  SERVICE_DOWNTIME_UPDATE_REQUEST,
  SERVICE_DOWNTIME_UPDATE_SUCCESS,
  SERVICE_DOWNTIME_UPDATE_FAIL,
  SERVICE_DOWNTIME_UPDATE_RESET,
  SERVICE_DETAILS_REQUEST,
  SERVICE_DETAILS_SUCCESS,
  SERVICE_DETAILS_FAIL,
  SERVICE_LIST_REQUEST,
  SERVICE_LIST_SUCCESS,
  SERVICE_LIST_FAIL,
} from "../constants/serviceConstants";
import axios from "axios";
import { logout } from "./userActions";

export const listServices = () => async (dispatch) => {
  try {
    dispatch({ type: SERVICE_LIST_REQUEST });
    const { data } = await axios.get("/api/services");
    dispatch({
      type: SERVICE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SERVICE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listServiceDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SERVICE_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/services/${id}`);

    dispatch({
      type: SERVICE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SERVICE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createServiceReview = (serviceId, report) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: SERVICE_DOWNTIME_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`/api/services/${serviceId}/report`, report, config);

    dispatch({
      type: SERVICE_DOWNTIME_UPDATE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: SERVICE_DOWNTIME_UPDATE_FAIL,
      payload: message,
    });
  }
};