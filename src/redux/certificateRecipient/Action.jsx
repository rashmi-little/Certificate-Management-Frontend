// action.js
import { api } from "../../config/config";
import { CERTIFICATESERVICE_COMMON_URL } from "../../constants/Constants";
import {
  DELETE_CERTIFICATE_RECIPIENT_REQUEST,
  DELETE_CERTIFICATE_RECIPIENT_SUCCESS,
  DELETE_CERTIFICATE_RECIPIENT_FAILURE,
  EDIT_CERTIFICATE_RECIPIENT_SUCCESS,
  EDIT_CERTIFICATE_RECIPIENT_FAILURE,
  EDIT_CERTIFICATE_RECIPIENT_REQUEST,
} from "./actionType";

export const deleteCertificateRecipient =
  (certificateId) => async (dispatch) => {
    dispatch({ type: DELETE_CERTIFICATE_RECIPIENT_REQUEST });

    try {
      const response = await api.delete(
        `${CERTIFICATESERVICE_COMMON_URL}/recipient`,
        {
          params: { certificateId },
        }
      );

      if (response.status === 200) {
        dispatch({
          type: DELETE_CERTIFICATE_RECIPIENT_SUCCESS,
          payload: certificateId,
        });
        return { success: true, certificateId };
      } else {
        dispatch({
          type: DELETE_CERTIFICATE_RECIPIENT_FAILURE,
          payload: "No content or deletion failed",
        });
        return { success: false, error: "No content or deletion failed" };
      }
    } catch (error) {
      dispatch({
        type: DELETE_CERTIFICATE_RECIPIENT_FAILURE,
        payload: error.message || "Something went wrong while deleting",
      });
      return { success: false, error: error.message };
    }
  };
export const editCertificateRecipient =
  (certificateId, certificateData) => async (dispatch) => {
    dispatch({ type: EDIT_CERTIFICATE_RECIPIENT_REQUEST });

    try {
      const response = await api.put(
        `${CERTIFICATESERVICE_COMMON_URL}/recipient`,
        {
          certificateId,
          certificateData: JSON.stringify(certificateData),
        }
      );

      if (response.status === 200) {
        dispatch({
          type: EDIT_CERTIFICATE_RECIPIENT_SUCCESS,
          payload: {
            certificateId,
            message: response.data,
            updatedData: certificateData,
          },
        });
        return { success: true, message: response.data };
      } else {
        const error = response.data || "Failed to update recipient";
        dispatch({
          type: EDIT_CERTIFICATE_RECIPIENT_FAILURE,
          payload: error,
        });
        return { success: false, error };
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Update failed";
      dispatch({
        type: EDIT_CERTIFICATE_RECIPIENT_FAILURE,
        payload: errorMessage,
      });
      return { success: false, error: errorMessage };
    }
  };
