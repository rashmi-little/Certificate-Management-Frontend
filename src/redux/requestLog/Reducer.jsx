import {
  FETCH_REQUEST_LOG_FAILURE,
  FETCH_REQUEST_LOG_REQUEST,
  FETCH_REQUEST_LOG_SUCCESS,
  RESET_REQUEST_LOG,
  FETCH_REQUEST_VIEW_REQUEST,
  FETCH_REQUEST_VIEW_SUCCESS,
  FETCH_REQUEST_VIEW_FAILURE,
  RESET_REQUEST_VIEW,
  UPDATE_CERTIFICATE_REQUEST_REQUEST,
  UPDATE_CERTIFICATE_REQUEST_SUCCESS,
  UPDATE_CERTIFICATE_REQUEST_FAILURE,
  RESET_UPDATE_REQUEST,
  CLEAR_REQUEST_LOG,
} from "./ActionType";

const initialState = {
  loading: false,
  data: [],
  hasMoreData: null,
  error: null,
};

export const requestLogReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUEST_LOG_REQUEST:
      return { ...state, loading: true };
    case FETCH_REQUEST_LOG_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.responses,
        hasMoreData: action.payload.hasMoreData,
      };
    case FETCH_REQUEST_LOG_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case CLEAR_REQUEST_LOG:
      return {
        ...state,
        data: [],
        hasMoreData: null,
      };

    case RESET_REQUEST_LOG:
      return initialState;

    default:
      return state;
  }
};

export const requestViewInitialState = {
  loading: false,
  requestView: null,
  error: null,
};

export const requestViewReducer = (state = requestViewInitialState, action) => {
  switch (action.type) {
    case FETCH_REQUEST_VIEW_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_REQUEST_VIEW_SUCCESS:
      return { ...state, loading: false, requestView: action.payload };
    case FETCH_REQUEST_VIEW_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case RESET_REQUEST_VIEW:
      return initialState;
    default:
      return state;
  }
};

const updateInitialState = {
  loading: false,
  successMessage: null,
  error: null,
};

export const updateRequestReducer = (state = updateInitialState, action) => {
  switch (action.type) {
    case UPDATE_CERTIFICATE_REQUEST_REQUEST:
      return { ...state, loading: true, successMessage: null, error: null };

    case UPDATE_CERTIFICATE_REQUEST_SUCCESS:
      return { ...state, loading: false, successMessage: action.payload };

    case UPDATE_CERTIFICATE_REQUEST_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case RESET_UPDATE_REQUEST:
      return updateInitialState;

    default:
      return state;
  }
};
