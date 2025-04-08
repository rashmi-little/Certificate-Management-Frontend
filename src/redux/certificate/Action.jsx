import { api } from "../../config/certificateConfig";
import {
  FETCH_STATISTICS_FAILURE,
  FETCH_STATISTICS_REQUEST,
  FETCH_STATISTICS_SUCCESS,
  FETCH_SCHEDULE_REQUEST,
  FETCH_SCHEDULE_SUCCESS,
  FETCH_SCHEDULE_FAILURE,
} from "./ActionType";

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
