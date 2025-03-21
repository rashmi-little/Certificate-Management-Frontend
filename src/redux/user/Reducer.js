import { USER_DELETED } from "../../constants/Constants";
import { deleteUser } from "./Action";
import { USER_CREATE_CLEAN, USER_CREATE_FAILURE, USER_CREATE_REQUEST, USER_CREATE_SUCCESS, USER_DELETE_CLEAN, USER_DELETE_FAILURE, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_GET_BY_ID_CLEAN, USER_GET_BY_ID_FAILURE, USER_GET_BY_ID_REQUEST, USER_GET_BY_ID_SUCCESS, USER_UPDATE_CLEAN, USER_UPDATE_FAILURE, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USERS_GET_CLEAN, USERS_GET_FAILURE, USERS_GET_REQUEST, USERS_GET_SUCCESS } from "./ActionType"

const initialState = {
    userCreateLoading: false,
    createdUser: null,
    userCreateError: null,
    userUpdateLoading: false,
    updatedUser: null,
    userUpdateError: null,
    userDeleteLoading: false,
    deletedUser: null,
    userDeleteError: null,
    userGetByIdLoading: false,
    userById: null,
    userGetByIdError: null,
    usersLoading: false,
    users: [],
    usersError: null
}

export const userReducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case USER_CREATE_REQUEST:
            return {...state, userCreateLoading: true};
        case USER_CREATE_SUCCESS:
            return {...state, userCreateLoading: false, createdUser: payload};
        case USER_CREATE_FAILURE:
            return {...state, userCreateLoading: false, userCreateError: payload};
        case USER_CREATE_CLEAN:
            return {...state, userCreateError: null}
        case USER_UPDATE_REQUEST:
            return {...state, userUpdateLoading: true};
        case USER_UPDATE_SUCCESS:
            return {...state, userUpdateLoading: false, createdUser: payload};
        case USER_UPDATE_FAILURE:
            return {...state, userUpdateLoading: false, userUpdateError: payload};
        case USER_UPDATE_CLEAN:
            return {...state, userUpdateError: null};
        case USER_DELETE_REQUEST:
            return {...state, userDeleteLoading: true};
        case USER_DELETE_SUCCESS:
            return {...state, userDeleteLoading: false, deleteUser: USER_DELETED};
        case USER_DELETE_FAILURE:
            return {...state, userDeleteLoading: false, userDeleteError: payload};
        case USER_DELETE_CLEAN:
            return {...state, userDeleteError: null};
        case USER_GET_BY_ID_REQUEST:
            return {...state, userGetByIdLoading: true};
        case USER_GET_BY_ID_SUCCESS:
            return {...state, userGetByIdLoading: false, userById: payload};
        case USER_GET_BY_ID_FAILURE:
            return {...state, userGetByIdLoading: false, userGetByIdError: payload};
        case USER_GET_BY_ID_CLEAN:
            return {...state, userGetByIdError: null};
        case USERS_GET_REQUEST:
            return {...state, usersLoading: true};
        case USERS_GET_SUCCESS:
            return {...state, usersLoading: false, users: payload};
        case USERS_GET_FAILURE:
            return {...state, usersLoading: false, usersError: payload};
        case USERS_GET_CLEAN:
            return {...state, usersError: null};
        default:
            return {...state};
    }
}