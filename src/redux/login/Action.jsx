import { api } from "../../config/config"
import { GET_USER_FROM_TOKEN_FAILURE, GET_USER_FROM_TOKEN_REQUEST, GET_USER_FROM_TOKEN_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./ActionType"

export const login = (reqData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST })
    try {
        const { data } = await api.post("/api/v1/login", reqData.data);
        if (data) {
            localStorage.setItem("token", data);
        }
        dispatch({ type: LOGIN_SUCCESS, payload: data });
        console.log("LoggedIn Successfull ", data);
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error.response?.data?.detail });
        console.log("Error while logging in ", error);
    }
}

export const getUserFromToken = () => async (dispatch) => {
    dispatch({ type: GET_USER_FROM_TOKEN_REQUEST })
    try {
        const { data } = await api.get("/api/v1/user-service/user/user-data/profile");
        if (data.role) {
            localStorage.setItem("role", data.role);
        }

        dispatch({ type: GET_USER_FROM_TOKEN_SUCCESS, payload: data });
        console.log("User fetched from token successfully ", data);
    } catch (error) {
        dispatch({ type: GET_USER_FROM_TOKEN_FAILURE, payload: error.message });
        console.log("Error while fetching user from token ", error);
    }
}