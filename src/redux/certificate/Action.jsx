import { useSelector } from "react-redux";
import { api } from "../../config/config";
import {
  CERTIFICATE_SERVICE_COMMON_URL,
  USERSERVICE_BASE_URL,
} from "../../constants/Constants";
import {
  FETCH_ALL_CATEGORIES,
  FETCH_ALL_TEMPLATE_BY_CATEGORYID,
  FETCH_CURRENT_TEMPLATE_STRUCTURE,
  SET_PROFILES_LIST,
  SET_REGISTER_REQUEST_ID,
} from "./ActionType";
import {
  FETCH_STATISTICS_FAILURE,
  FETCH_STATISTICS_REQUEST,
  FETCH_STATISTICS_SUCCESS,
  FETCH_SCHEDULE_REQUEST,
  FETCH_SCHEDULE_SUCCESS,
  FETCH_SCHEDULE_FAILURE,
} from "./ActionType";
import { type } from "@testing-library/user-event/dist/cjs/utility/type.js";

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
        `${CERTIFICATE_SERVICE_COMMON_URL}/user/statistics`,
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
      `${CERTIFICATE_SERVICE_COMMON_URL}/user/getScheduleRequestInfo`
    );

    dispatch({ type: FETCH_SCHEDULE_SUCCESS, payload: data });
    console.log("Schedule Request Info Successfully fetched", data);
  } catch (error) {
    dispatch({ type: FETCH_SCHEDULE_FAILURE, payload: error.message });
    console.error("Error while fetching ScheduleRequestInfo ", error);
  }
};

export const getAllCategories = () => async (dispatch) => {
  try {
    const { data } = await api.get(
      `${CERTIFICATE_SERVICE_COMMON_URL}/category`
    );
    dispatch({ type: FETCH_ALL_CATEGORIES, payload: data });
    console.log(data);
  } catch (error) {
    console.error("Error while fetching category ", error);
  }
};

export const getAllTemplatesByCategory = (categoryId) => async (dispatch) => {
  try {
    const { data } = await api.get(
      `${CERTIFICATE_SERVICE_COMMON_URL}/template?certificateCategoryId=${categoryId}`
    );
    dispatch({ type: FETCH_ALL_TEMPLATE_BY_CATEGORYID, payload: data });
    console.log(data);
  } catch (error) {
    console.error("Error while fetching category ", error);
  }
};

export const getTemplateStructure = (templateId) => async (dispatch) => {
  try {
    const { data } = await api.get(
      `${CERTIFICATE_SERVICE_COMMON_URL}/template/structure/${templateId}`
    );
    console.log(data);
    dispatch({ type: FETCH_CURRENT_TEMPLATE_STRUCTURE, payload: data });
    return data;
  } catch (error) {
    console.error("Error while fetching category ", error);
    return null;
  }
};

export const makeCertificateRequest = (requestData) => async (dispatch) => {
  try {
    const { data } = await api.post(
      `${CERTIFICATE_SERVICE_COMMON_URL}/certificate-request`,
      requestData
    );
    console.log("Request registered successfully:", data);
    dispatch({ type: SET_REGISTER_REQUEST_ID, payload: data });
    return { success: true, data: data };
  } catch (error) {
    console.error("Error while creating certificate request:", error);
    return { success: false, error };
  }
};

export const getAllProfiles = () => async (dispatch) => {
  try {
    const { data } = await api.get(
      `${USERSERVICE_BASE_URL}/user/user-data/profiles`
    );
    dispatch({ type: SET_PROFILES_LIST, payload: data });
    console.log(data);
  } catch (error) {
    console.error("Error while fetching profiles ", error);
  }
};
