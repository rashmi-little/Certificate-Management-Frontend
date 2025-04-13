import { api } from "../../config/config";
import { FETCH_TYPE, STATUS, TABS, USERSERVICE_BASE_URL } from "../../constants/Constants";
import { ADMINS_GET_FAILURE, ADMINS_GET_REQUEST, ADMINS_GET_SUCCESS, LOCKED_GET_FAILURE, LOCKED_GET_REQUEST, LOCKED_GET_SUCCESS, USER_CREATE_RESET, USER_CREATE_FAILURE, USER_CREATE_REQUEST, USER_CREATE_SUCCESS, USER_DELETE_CLEAN, USER_DELETE_FAILURE, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_GET_BY_ID_CLEAN, USER_GET_BY_ID_FAILURE, USER_GET_BY_ID_REQUEST, USER_GET_BY_ID_SUCCESS, USER_UPDATE_CLEAN, USER_UPDATE_FAILURE, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USERS_GET_RESET, USERS_GET_FAILURE, USERS_GET_PAGINATED_FAILURE, USERS_GET_PAGINATED_REQUEST, USERS_GET_PAGINATED_SUCCESS, USERS_GET_REQUEST, USERS_GET_SORTED_FAILURE, USERS_GET_SORTED_REQUEST, USERS_GET_SORTED_SUCCESS, USERS_GET_SUCCESS, USERS_LOCK_FAILURE, USERS_LOCK_REQUEST, USERS_LOCK_SUCCESS, USERS_REMOVE_FAILURE, USERS_REMOVE_REQUEST, USERS_REMOVE_SUCCESS, USERS_UNLOCK_FAILURE, USERS_UNLOCK_REQUEST, USERS_UNLOCK_SUCCESS, ADMINS_GET_RESET, LOCKED_GET_RESET, ADMINS_SORTED_SUCCESS, USERS_SORTED_REQUEST, LOCKED_SORTED_REQUEST, USERS_SORTED_SUCCESS, LOCKED_SORTED_SUCCESS, ADMINS_SORTED_FAILURE, USERS_SORTED_FAILURE, LOCKED_SORTED_FAILURE, ADMINS_CLEAN, USERS_CLEAN, LOCKED_CLEAN, ADMINS_SORTED_REQUEST, PAGE_NUMBER_UPDATE, HAS_MORE_UPDATE, SORTING_ENABLED_UPDATE, SORTING_TYPE_RESET } from "./ActionType"

/**
 * Creates a new user
 * @param reqData The details of new user 
 * @returns Newly created user
 */
export const createUser = (reqData) => async (dispatch) => {
    dispatch({ type: USER_CREATE_REQUEST });
    try {
        const { data } = await api.post(`/${USERSERVICE_BASE_URL}/user-data`, reqData);
        dispatch({ type: USER_CREATE_SUCCESS, payload: data });
        console.log("User created successfully ", data);
    } catch (error) {
        dispatch({ type: USER_CREATE_FAILURE, payload: error?.response?.data?.detail });
        console.log("Error creating user ", error);
    }
    finally {
        // cleans the error state
        setTimeout(() => {
            dispatch({ type: USER_CREATE_RESET });
        }, 6000);
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
        const { data } = await api.put(`/${USERSERVICE_BASE_URL}/user/user-data/${reqData.id}`, reqData);
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
        console.log("User update success: ", data);
    } catch (error) {
        dispatch({ type: USER_UPDATE_FAILURE, payload: error?.response?.data?.detail });
        console.log("Error updating user: ", error);
    }
    finally {
        setTimeout(() => {
            dispatch({ type: USER_UPDATE_CLEAN });
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
        await api.delete(`/${USERSERVICE_BASE_URL}/user-data/${reqData.id}`);
        dispatch({ type: USER_DELETE_SUCCESS });
        console.log("User deleted successfully ");
    } catch (error) {
        dispatch({ type: USER_DELETE_FAILURE, payload: error?.response?.data?.detail });
        console.log("Error deleting user: ", error);
    }
    finally {
        setTimeout(() => {
            dispatch({ type: USER_DELETE_CLEAN });
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
        const { data } = await api.get(`/${USERSERVICE_BASE_URL}/user/user-data/${reqData.id}`);
        dispatch({ type: USER_GET_BY_ID_SUCCESS, payload: data });
        console.log("User by Id fetched successfull: ", data);
    } catch (error) {
        dispatch({ type: USER_GET_BY_ID_FAILURE, payload: error?.response?.data?.detail });
        console.log("Error getting user by id: ", error);
    }
    finally {
        setTimeout(() => {
            dispatch({ type: USER_GET_BY_ID_CLEAN });
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
        const { data } = await api.get(`/${USERSERVICE_BASE_URL}/user-data/paginated?pageNumber=${reqData.pageNumber}&pageSize=${reqData.pageSize}`);
        dispatch({ type: USERS_GET_SUCCESS, payload: data });
        console.log("Users fetched success: ", data);
    } catch (error) {
        dispatch({ type: USERS_GET_FAILURE, payload: error?.response?.data?.detail });
        console.error("Error fetching users: ", error);
    }
    finally {
        setTimeout(() => {
            dispatch({ type: USERS_GET_RESET });
        }, 3000);
    }
}

export const getPaginatedUsers = (pageNumber, type) => async (dispatch) => {
    if (type === FETCH_TYPE.ADMIN) {
        dispatch({ type: ADMINS_GET_REQUEST });
    }
    else if (type === FETCH_TYPE.USER) {
        dispatch({ type: USERS_GET_REQUEST });
    }
    else if (type === FETCH_TYPE.INACTIVE) {
        dispatch({ type: LOCKED_GET_REQUEST });
    }
    try {
        const { data } = await api.get(`/${USERSERVICE_BASE_URL}/user-data/paginated?pageNumber=${pageNumber}&pageSize=${13}&type=${type}`);
        if (type === FETCH_TYPE.ADMIN) {
            dispatch({ type: ADMINS_GET_SUCCESS, payload: data });
            dispatch({type: PAGE_NUMBER_UPDATE, payload: {
                updatedPageNumber: pageNumber + 1, 
                type: TABS.ADMINS
            }})
            dispatch({type: HAS_MORE_UPDATE, payload: {
                type: TABS.ADMINS,
                value: data.currentPageNumber !== data.totalPages,
            }})
        }
        else if (type === FETCH_TYPE.USER) {
            dispatch({ type: USERS_GET_SUCCESS, payload: data });
            dispatch({type: PAGE_NUMBER_UPDATE, payload: {
                updatedPageNumber: pageNumber + 1, 
                type: TABS.USERS
            }})
            dispatch({type: HAS_MORE_UPDATE, payload: {
                type: TABS.USERS,
                value: data.currentPageNumber !== data.totalPages,
            }})
        }
        else if (type === FETCH_TYPE.INACTIVE) {
            dispatch({ type: LOCKED_GET_SUCCESS, payload: data });
            dispatch({type: PAGE_NUMBER_UPDATE, payload: {
                updatedPageNumber: pageNumber + 1, 
                type: TABS.LOCKED
            }})
            dispatch({type: HAS_MORE_UPDATE, payload: {
                type: TABS.LOCKED,
                value: data.currentPageNumber !== data.totalPages,
            }})
        }
        
        console.log("Paginated users fetched successfully: ", data);
    } catch (error) {
        if (type === FETCH_TYPE.ADMIN) {
            dispatch({ type: ADMINS_GET_FAILURE, payload: error?.response?.data?.detail });
        }
        else if (type === FETCH_TYPE.USER) {
            dispatch({ type: USERS_GET_FAILURE, payload: error?.response?.data?.detail });
        }
        else if (type === FETCH_TYPE.INACTIVE) {
            dispatch({ type: LOCKED_GET_FAILURE, payload: error?.response?.data?.detail });
        }
        console.log("Error while fetching paginated users: ", error);
    }
    finally {
        // cleans the error state
        setTimeout(() => {

            if (type === FETCH_TYPE.ADMIN) {
                dispatch({ type: ADMINS_GET_RESET });
            }
            else if (type === FETCH_TYPE.USER) {
                dispatch({ type: USERS_GET_RESET });
            }
            else if (type === FETCH_TYPE.INACTIVE) {
                dispatch({ type: LOCKED_GET_RESET });
            }
        }, 3000);
    }
}

export const getSortedUsers = (sortBy, pageNumber, type) => async (dispatch) => {
   
    if (type === FETCH_TYPE.ADMIN) {
        dispatch({ type: ADMINS_GET_REQUEST });
    }
    else if (type === FETCH_TYPE.USER) {
        dispatch({ type: USERS_GET_REQUEST });
    }
    else if (type === FETCH_TYPE.INACTIVE) {
        dispatch({ type: LOCKED_GET_REQUEST });
    }
    try {
        const params = {};
        params.pageNumber = pageNumber;
        params.type = type;
        if (sortBy.sortByLastActiveAtLatest) {
            params.sortByLastActiveAtLatest = sortBy.sortByLastActiveAtLatest;
        }
        if (sortBy.sortByLastActiveAtOldest) {
            params.sortByLastActiveAtOldest = sortBy.sortByLastActiveAtOldest;
        }
        if (sortBy.sortByCreatedAtLatest) {
            params.sortByCreatedAtLatest = sortBy.sortByCreatedAtLatest;
        }
        if (sortBy.sortByCreatedAtOldest) {
            params.sortByCreatedAtOldest = sortBy.sortByCreatedAtOldest;
        }

        const { data } = await api.get(`${USERSERVICE_BASE_URL}/users/sorted`, { params });
        
        if (type === FETCH_TYPE.ADMIN) {
            dispatch({ type: ADMINS_GET_SUCCESS, payload: data });
            dispatch({type: PAGE_NUMBER_UPDATE, payload: {
                updatedPageNumber: pageNumber + 1, 
                type: TABS.ADMINS
            }})
            dispatch({type: HAS_MORE_UPDATE, payload: {
                type: TABS.ADMINS,
                value: data.currentPageNumber !== data.totalPages,
            }})
        }
        else if (type === FETCH_TYPE.USER) {
            dispatch({ type: USERS_GET_SUCCESS, payload: data });
            dispatch({type: PAGE_NUMBER_UPDATE, payload: {
                updatedPageNumber: pageNumber + 1, 
                type: TABS.USERS
            }})
            dispatch({type: HAS_MORE_UPDATE, payload: {
                type: TABS.USERS,
                value: data.currentPageNumber !== data.totalPages,
            }})
        }
        else if (type === FETCH_TYPE.INACTIVE) {
            dispatch({ type: LOCKED_GET_SUCCESS, payload: data });
            dispatch({type: PAGE_NUMBER_UPDATE, payload: {
                updatedPageNumber: pageNumber + 1, 
                type: TABS.LOCKED
            }})
            dispatch({type: HAS_MORE_UPDATE, payload: {
                type: TABS.LOCKED,
                value: data.currentPageNumber !== data.totalPages,
            }})
        }
       
        dispatch({type: SORTING_ENABLED_UPDATE, payload: {
            value: data.currentPageNumber !== data.totalPages }})
        if (data.currentPageNumber === data.totalPages) {
            dispatch({type: SORTING_TYPE_RESET});
        }
        console.log("Sorted users list: ", data);
    } catch (error) {
        if (type === FETCH_TYPE.ADMIN) {
            dispatch({ type: ADMINS_GET_FAILURE, payload: error?.response?.data?.detail });
        }
        else if (type === FETCH_TYPE.USER) {
            dispatch({ type: USERS_GET_FAILURE, payload: error?.response?.data?.detail });
        }
        else if (type === FETCH_TYPE.INACTIVE) {
            dispatch({ type: LOCKED_GET_FAILURE, payload: error?.response?.data?.detail });
        }
        console.log("Error while fetching sorted users list: ", error);
    }
    finally {
        // cleans the error state
        setTimeout(() => {

            if (type === FETCH_TYPE.ADMIN) {
                dispatch({ type: ADMINS_GET_RESET });
            }
            else if (type === FETCH_TYPE.USER) {
                dispatch({ type: USERS_GET_RESET });
            }
            else if (type === FETCH_TYPE.INACTIVE) {
                dispatch({ type: LOCKED_GET_RESET });
            }
        }, 3000);
    }
}

export const lockUser = (userIds) => async (dispatch) => {
    dispatch({ type: USERS_LOCK_REQUEST })
    try {
        const params = {
            userIds: userIds
        };
        const { data } = await api.put(`${USERSERVICE_BASE_URL}/users/lock`, params);
        dispatch({ type: USERS_LOCK_SUCCESS, payload: data });
        console.log("User locked successfully: ", data);
    } catch (error) {
        dispatch({ type: USERS_LOCK_FAILURE, payload: error?.response?.data?.detail });
        console.log("Error while locking user: ", error);
    }
}
export const removeUser = (userId) => async (dispatch) => {
    dispatch({ type: USERS_REMOVE_REQUEST })
    try {
        const params = {
            userId: userId
        };
        const { data } = await api.put(`${USERSERVICE_BASE_URL}/users/remove`, params);
        dispatch({ type: USERS_REMOVE_SUCCESS, payload: data });
        console.log("User removed successfully: ", data);
    } catch (error) {
        dispatch({ type: USERS_REMOVE_FAILURE, payload: error?.response?.data?.detail });
        console.log("Error while removing user: ", error);
    }
}
export const unlockUser = (userId) => async (dispatch) => {
    dispatch({ type: USERS_UNLOCK_REQUEST })
    try {
        const params = {
            userId: userId
        };
        const { data } = await api.put(`${USERSERVICE_BASE_URL}/users/unlock`, params);
        dispatch({ type: USERS_UNLOCK_SUCCESS, payload: data });
        console.log("User unlocked successfully: ", data);
    } catch (error) {
        dispatch({ type: USERS_UNLOCK_FAILURE, payload: error?.response?.data?.detail });
        console.log("Error while unlocking user: ", error);
    }
}