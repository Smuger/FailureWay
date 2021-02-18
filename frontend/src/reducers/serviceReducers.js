import {
  SERVICE_CREATE_FAIL,
  SERVICE_CREATE_REQUEST,
  SERVICE_CREATE_SUCCESS,
  SERVICE_DETAILS_FAIL,
  SERVICE_DETAILS_REQUEST,
  SERVICE_DETAILS_SUCCESS,
  SERVICE_DOWNTIME_UPDATE_FAIL,
  SERVICE_DOWNTIME_UPDATE_REQUEST,
  SERVICE_DOWNTIME_UPDATE_RESET,
  SERVICE_DOWNTIME_UPDATE_SUCCESS,
  SERVICE_LIST_FAIL,
  SERVICE_LIST_REQUEST,
  SERVICE_LIST_SUCCESS,
} from "../constants/serviceConstants";

export const updateServiceDowntimeReducer = (state = {}, action) => {
  switch (action.type) {
    case SERVICE_DOWNTIME_UPDATE_REQUEST:
      return { loading: true };
    case SERVICE_DOWNTIME_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case SERVICE_DOWNTIME_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case SERVICE_DOWNTIME_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const serviceListReducer = (state = { services: [] }, action) => {
  switch (action.type) {
    case SERVICE_LIST_REQUEST:
      return { loading: true, services: [] };
    case SERVICE_LIST_SUCCESS:
      return { loading: false, services: action.payload };
    case SERVICE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const serviceDetailsReducer = (
  state = { service: { report: [] } },
  action
) => {
  switch (action.type) {
    case SERVICE_DETAILS_REQUEST:
      return { loading: true, ...state };
    case SERVICE_DETAILS_SUCCESS:
      return { loading: false, service: action.payload };
    case SERVICE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const serviceCreateReducer = (
  state = { service: { report: [] } },
  action
) => {
  switch (action.type) {
    case SERVICE_CREATE_REQUEST:
      return { loading: true, ...state };
    case SERVICE_CREATE_SUCCESS:
      return { loading: false, success: true };
    case SERVICE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
