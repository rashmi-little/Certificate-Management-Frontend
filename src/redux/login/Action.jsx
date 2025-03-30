import { api } from "../../config/config";
import {
  CLEAR_LOGIN_ERROR,
  CLEAR_PASSWORD_RESET,
  GET_USER_FROM_TOKEN_FAILURE,
  GET_USER_FROM_TOKEN_REQUEST,
  GET_USER_FROM_TOKEN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  PASSWORD_RESET_FAILURE,
  PASSWORD_RESET_LINK_SENT_CLEAR,
  PASSWORD_RESET_LINK_SENT_FAILURE,
  PASSWORD_RESET_LINK_SENT_SUCCESS,
  PASSWORD_RESET_SUCCESS,
} from "./ActionType";

/**
 *  Handles user login
 *
 *  - Clears existing login errors.
 *  - Sends login request to backend.
 *  - Stores the token in local storage
 *  - Dispatches relevant redux actions based on success or failure.
 *  @param reqData - The login request data containing user credentials
 */
export const login = (reqData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await api.post("/api/v1/login", reqData.data);
    if (data) {
      localStorage.setItem("token", data);
    }
    dispatch({ type: LOGIN_SUCCESS, payload: data });
    console.log("LoggedIn Successfull ", data);
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.response?.data?.detail });
    console.error("Error while logging in ", error);
  }
};

/**
 *  Handles fetching user details from the token
 *
 *  - Stores the role in the local storage
 *  - Dispatches the relevant redux actions
 */
export const getUserFromToken = () => async (dispatch) => {
  dispatch({ type: GET_USER_FROM_TOKEN_REQUEST });
  try {
    const { data } = await api.get(
      "/api/v1/user-service/user/user-data/profile"
    );
    if (data.role) {
      localStorage.setItem("role", data.role);
    }

    dispatch({ type: GET_USER_FROM_TOKEN_SUCCESS, payload: data });
    console.log("User fetched from token successfully ", data);
  } catch (error) {
    dispatch({ type: GET_USER_FROM_TOKEN_FAILURE, payload: error.message });
    console.error("Error while fetching user from token ", error);
  }
};

/**
 *  Handles sending password reset link
 *  @param reqData The email to which the link will be sent
 */
export const sendPasswordResetLink = (reqData) => async (dispatch) => {
  try {
    const { data } = await api.post(`/api/v1/user-service/reset-token?email=${reqData.email}`);
    const payload = {
      passwordResetLinkSent: true
    };
    dispatch({ type: PASSWORD_RESET_LINK_SENT_SUCCESS, payload: payload });
    console.log("Password reset link sent successfully", data);
  } catch (error) {
    dispatch({ type: PASSWORD_RESET_LINK_SENT_FAILURE, payload: error?.response?.data?.detail });
    console.error("Error while sending password reset link", error);
  }
}

/**
 *  Handles resetting the password
 *  @param reqData New password to be set and the valid token
 */
export const resetPassword = (reqData) => async (dispatch) => {

  try {
    const {data} = await api.post("/api/v1/user-service/reset-password", reqData);
    const payload = {
      passwordReset: true,
    };
    dispatch({ type: PASSWORD_RESET_SUCCESS, payload: payload });
    console.log("Password reset successfully", data);
  } catch (error) {
    dispatch({ type: PASSWORD_RESET_FAILURE, payload: error.response.data.detail });
    console.error("Error while password reset ", error);
  }
  finally {
    // Clear the state to handle the state change
    setTimeout(() => {
      dispatch({ type: CLEAR_PASSWORD_RESET })
    }, 3000);
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  try {
    dispatch({ type: LOGOUT });
    console.log("Logged out successfully ");
  } catch (error) {
    console.error("Error while logging out ", error);
  }
}