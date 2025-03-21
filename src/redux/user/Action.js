import { api } from "../../config/config";
import { COMMON_URL } from "../../constants/Constants";
import { USER_CREATE_CLEAN, USER_CREATE_FAILURE, USER_CREATE_REQUEST, USER_CREATE_SUCCESS, USER_DELETE_CLEAN, USER_DELETE_FAILURE, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_GET_BY_ID_CLEAN, USER_GET_BY_ID_FAILURE, USER_GET_BY_ID_REQUEST, USER_GET_BY_ID_SUCCESS, USER_UPDATE_CLEAN, USER_UPDATE_FAILURE, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USERS_GET_CLEAN, USERS_GET_FAILURE, USERS_GET_REQUEST, USERS_GET_SUCCESS } from "./ActionType"

/**
 * Creates a new user
 * @param reqData The details of new user 
 * @returns Newly created user
 */
export const createUser = (reqData) => async (dispatch) => {
    dispatch({ type: USER_CREATE_REQUEST });
    try {
        const { data } = await api.post(`${COMMON_URL}/user-data`, reqData);
        dispatch({ type: USER_CREATE_SUCCESS, payload: data });
        console.log("User created successfully ", data);
    } catch (error) {
        dispatch({ type: USER_CREATE_FAILURE, payload: error?.response?.data?.detail });
        console.log("Error creating user ", error);
    }
    finally {
        // cleans the error state
        setTimeout(() => {
            dispatch({type: USER_CREATE_CLEAN});
        }, 3000);
    }
}

/**
 * Updates user
 * @param reqData Updated details of user
 * @returns Updated user
 */
export const updateUser = (reqData) => async (dispatch) => {
    dispatch({ type: USER_UPDATE_REQUEST });
    try {
        const { data } = await api.put(`${COMMON_URL}/user/user-data/${reqData.id}`, reqData);
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
        console.log("User update success: ", data);
    } catch (error) {
        dispatch({ type: USER_UPDATE_FAILURE, payload: error?.response?.data?.detail });
        console.log("Error updating user: ", error);
    }
    finally {
        setTimeout(() => {
            dispatch({type: USER_UPDATE_CLEAN});
        }, 3000);
    }
}

/**
 * Deletes user
 * @param reqData Id of the user
 */
export const deleteUser = (reqData) => async (dispatch) => {
    dispatch({ type: USER_DELETE_REQUEST });
    try {
        await api.delete(`${COMMON_URL}/user-data/${reqData.id}`);
        dispatch({ type: USER_DELETE_SUCCESS });
        console.log("User deleted successfully ");
    } catch (error) {
        dispatch({ type: USER_DELETE_FAILURE, payload: error?.response?.data?.detail });
        console.log("Error deleting user: ", error);
    }
    finally {
        setTimeout(() => {
            dispatch({type: USER_DELETE_CLEAN});
        }, 3000);
    }
}

/**
 * Fetches user by Id
 * @param reqData Id of the user
 * @returns user
 */
export const getUserById = (reqData) => async (dispatch) => {
    dispatch({ type: USER_GET_BY_ID_REQUEST })
    try {
        const { data } = await api.get(`${COMMON_URL}/user/user-data/${reqData.id}`);
        dispatch({ type: USER_GET_BY_ID_SUCCESS, payload: data });
        console.log("User by Id fetched successfull: ", data);
    } catch (error) {
        dispatch({ type: USER_GET_BY_ID_FAILURE, payload: error?.response?.data?.detail });
        console.log("Error getting user by id: ", error);
    }
    finally {
        setTimeout(() => {
            dispatch({type: USER_GET_BY_ID_CLEAN});
        }, 3000);
    }
}

/**
 * Fetch users by page
 * @param reqData Page Number and Page size details
 * @returns paginated users
 */
export const getUsers = (reqData) => async (dispatch) => {
    dispatch({ type: USERS_GET_REQUEST })
    try {
        const { data } = await api.get(`${COMMON_URL}/user-data/paginated?pageNumber=${reqData.pageNumber}&pageSize=${reqData.pageSize}`);
        dispatch({type: USERS_GET_SUCCESS, payload: data});
        console.log("Users fetched success: ", data);
    } catch (error) {
        dispatch({type: USERS_GET_FAILURE, payload: error?.response?.data?.detail});
        console.error("Error fetching users: ", error);
    }
    finally {
        setTimeout(() => {
            dispatch({type: USERS_GET_CLEAN});
        }, 3000);
    }
}