import { FETCH_ALL_CATEGORIES } from "./ActionType";
import {
  FETCH_STATISTICS_REQUEST,
  FETCH_STATISTICS_SUCCESS,
  FETCH_STATISTICS_FAILURE,
  FETCH_SCHEDULE_REQUEST,
  FETCH_SCHEDULE_SUCCESS,
  FETCH_SCHEDULE_FAILURE,
} from "./ActionType";

const initialState = {
  data: null,
  dataLoading: false,
  dataError: null,
  scheduleRequestInfoData: null,
  scheduleRequestLoading: false,
  scheduleRequestError: null,
  categories: [],
};

export const certificateReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_STATISTICS_REQUEST:
      return { ...state, dataLoading: true };
    case FETCH_STATISTICS_SUCCESS:
      return { ...state, dataLoading: false, data: payload };
    case FETCH_STATISTICS_FAILURE:
      return { ...state, dataLoading: false, dataError: payload };
    case FETCH_SCHEDULE_REQUEST:
      return { ...state, scheduleRequestLoading: true };
    case FETCH_SCHEDULE_SUCCESS:
      return {
        ...state,
        scheduleRequestLoading: false,
        scheduleRequestInfoData: payload,
      };
    case FETCH_SCHEDULE_FAILURE:
      return {
        ...state,
        scheduleRequestLoading: false,
        scheduleRequestError: payload,
      };
    case FETCH_ALL_CATEGORIES:
      return {
        ...state,
        categories: payload,
      };
    default:
      return state;
  }
};
