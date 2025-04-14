import { useSelector } from "react-redux";
import { api } from "../../config/certificateConfig";
import {
  FETCH_ALL_CATEGORIES,
  FETCH_ALL_TEMPLATE_BY_CATEGORYID,
  FETCH_CURRENT_TEMPLATE_STRUCTURE,
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

const CERTIFICATE_SERVICE_PREFIX = "/certificate-service";

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

export const getAllCategories = () => async (dispatch) => {
  try {
    const { data } = await api.get(
      `${CERTIFICATE_SERVICE_PREFIX}/api/v1/certificate-service/category`
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
      `${CERTIFICATE_SERVICE_PREFIX}/api/v1/certificate-service/template?certificateCategoryId=${categoryId}`
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
      `${CERTIFICATE_SERVICE_PREFIX}/api/v1/certificate-service/template/structure/${templateId}`
    );
    console.log(data);
    dispatch({ type: FETCH_CURRENT_TEMPLATE_STRUCTURE, payload: data });
  } catch (error) {
    console.error("Error while fetching category ", error);
  }
};

export const makeCertificateRequest = async (requestData) => {
  try {
    const response = await api.post(
      `${CERTIFICATE_SERVICE_PREFIX}/api/v1/certificate-service/certificate-request`,
      requestData
    );
    console.log("Request registered successfully:", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error while creating certificate request:", error);
    return { success: false, error };
  }
};
