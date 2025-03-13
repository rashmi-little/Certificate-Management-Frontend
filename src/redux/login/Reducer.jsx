import { GET_USER_FROM_TOKEN_FAILURE, GET_USER_FROM_TOKEN_REQUEST, GET_USER_FROM_TOKEN_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./ActionType"

const initialState = {
    token: null,
    user: null,
    tokenLoading: false,
    userLoading: false,
    loginError: null,
    tokenError: null,
}

export const loginReducer = (state=initialState, {type, payload}) => {
    switch(type) {
        case LOGIN_REQUEST:
            return {...state, tokenLoading: true};
        case LOGIN_SUCCESS:
            return {...state, tokenLoading: false, token: payload};
        case LOGIN_FAILURE:
            return {...state, tokenLoading: false, loginError: payload};
        case GET_USER_FROM_TOKEN_REQUEST:
            return {...state, userLoading: true};
        case GET_USER_FROM_TOKEN_SUCCESS:
            return {...state, userLoading: false, user: payload};
        case GET_USER_FROM_TOKEN_FAILURE:
            return {...state, userLoading: false, tokenError: payload};
        default:
            return state;
    }
}