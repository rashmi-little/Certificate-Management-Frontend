import { api } from "../../config/certificateConfig";
import {
  FETCH_STATISTICS_FAILURE,
  FETCH_STATISTICS_REQUEST,
  FETCH_STATISTICS_SUCCESS,
  FETCH_SCHEDULE_REQUEST,
  FETCH_SCHEDULE_SUCCESS,
  FETCH_SCHEDULE_FAILURE,
} from "./ActionType";

/**
 * Fetches certificate request statistics for the current user based on the provided date range.
 *
 * This action creator:
 * - Dispatches FETCH_STATISTICS_REQUEST before initiating the API call.
 * - Calls the endpoint `/api/v1/certificate-service/user/statistics` with `startDate` and `endDate` as query parameters.
 * - On success, dispatches FETCH_STATISTICS_SUCCESS with the response data as payload.
 * - On failure, dispatches FETCH_STATISTICS_FAILURE with an error message as payload.
 *
 * @param {string} startDate - The start date for the statistics range (format: YYYY-MM-DD).
 * @param {string} endDate - The end date for the statistics range (format: YYYY-MM-DD).
 * @returns {Function} A Redux thunk function.
 */
export const getCertificateStatistics =
  (startDate, endDate) => async (dispatch) => {
    dispatch({ type: FETCH_STATISTICS_REQUEST });

    try {
      const { data } = await api.get(
        "/api/v1/certificate-service/user/statistics",
        {
          params: { startDate, endDate }, // Sending startDate and endDate as query params
        }
      );

      dispatch({ type: FETCH_STATISTICS_SUCCESS, payload: data });
      console.log("Fetching Data Successful ", data);
    } catch (error) {
      dispatch({
        type: FETCH_STATISTICS_FAILURE,
        payload: error.response?.data?.detail || "An error occurred",
      });
      console.error("Error while fetching data", error);
    }
  };

/**
 * Fetches scheduled certificate request information for the current user.
 *
 * This action creator:
 * - Dispatches FETCH_SCHEDULE_REQUEST before initiating the API call.
 * - Calls the endpoint `/api/v1/certificate-service/user/getScheduleRequestInfo`.
 * - On success, dispatches FETCH_SCHEDULE_SUCCESS with the response data as payload.
 * - On failure, dispatches FETCH_SCHEDULE_FAILURE with an error message as payload.
 *
 * @returns {Function} A Redux thunk function.
 */
export const getScheduleRequestInfo = () => async (dispatch) => {
  dispatch({ type: FETCH_SCHEDULE_REQUEST });
  try {
    const { data } = await api.get(
      "/api/v1/certificate-service/user/getScheduleRequestInfo"
    );

    dispatch({ type: FETCH_SCHEDULE_SUCCESS, payload: data });
    console.log("Schedule Request Info Successfully fetched", data);
  } catch (error) {
    dispatch({ type: FETCH_SCHEDULE_FAILURE, payload: error.message });
    console.error("Error while fetching ScheduleRequestInfo ", error);
  }
};
