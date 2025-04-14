import { api } from "../../config/config";
import { CERTIFICATE_SERVICE_COMMON_URL } from "../../constants/Constants";
import {
  CLEAR_REQUEST_LOG,
  FETCH_REQUEST_LOG_FAILURE,
  FETCH_REQUEST_LOG_REQUEST,
  FETCH_REQUEST_LOG_SUCCESS,
  FETCH_REQUEST_VIEW_FAILURE,
  FETCH_REQUEST_VIEW_REQUEST,
  FETCH_REQUEST_VIEW_SUCCESS,
  RESET_UPDATE_REQUEST,
  UPDATE_CERTIFICATE_REQUEST_FAILURE,
  UPDATE_CERTIFICATE_REQUEST_REQUEST,
  UPDATE_CERTIFICATE_REQUEST_SUCCESS,
} from "./ActionType";

export const fetchRequestLog = (filters, hasMoreRef) => async (dispatch) => {
  dispatch({ type: FETCH_REQUEST_LOG_REQUEST });
  console.log(filters.categoryName);
  const params = {
    ...(filters.categoryName ? { categoryName: filters.categoryName } : {}),
    ...(filters.status ? { status: filters.status } : {}),
    ...(filters.lastId ? { lastId: filters.lastId } : {}),
    ...(filters.sortBy ? { sortBy: filters.sortBy } : {}),
  };

  try {
    const { data } = await api.get(`${CERTIFICATE_SERVICE_COMMON_URL}`, {
      params,
    });
    dispatch({
      type: FETCH_REQUEST_LOG_SUCCESS,
      payload: data,
    });
    hasMoreRef.current = data.hasMoreData;
    console.log("Requests fetched ", data);
  } catch (error) {
    dispatch({
      type: FETCH_REQUEST_LOG_FAILURE,
      payload: error.message,
    });
    console.log("Error while fetching requests: ", error);
  }
};
export const clearRequestLog = () => ({
  type: CLEAR_REQUEST_LOG,
});

export const fetchRequestView = (requestId) => async (dispatch) => {
  dispatch({ type: FETCH_REQUEST_VIEW_REQUEST });

  try {
    const { data } = await api.get(`${CERTIFICATE_SERVICE_COMMON_URL}/view`, {
      params: { requestId },
    });

    dispatch({
      type: FETCH_REQUEST_VIEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_REQUEST_VIEW_FAILURE,
      payload: error.message,
    });
    console.error("Error while fetching request view:", error);
  }
};

export const updateCertificateRequest =
  (payload, onSuccess) => async (dispatch) => {
    dispatch({ type: UPDATE_CERTIFICATE_REQUEST_REQUEST });

    try {
      const { data } = await api.put(
        `${CERTIFICATE_SERVICE_COMMON_URL}/certificate-request`,
        payload
      );

      dispatch({
        type: UPDATE_CERTIFICATE_REQUEST_SUCCESS,
        payload: data,
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      dispatch({
        type: UPDATE_CERTIFICATE_REQUEST_FAILURE,
        payload: error?.response?.data || error.message,
      });
    }
  };

export const resetUpdateRequest = () => ({ type: RESET_UPDATE_REQUEST });
