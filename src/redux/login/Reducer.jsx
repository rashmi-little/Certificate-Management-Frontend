import {
    CLEAR_LOGIN_ERROR,
    CLEAR_PASSWORD_RESET,
    GET_USER_FROM_TOKEN_FAILURE,
    GET_USER_FROM_TOKEN_REQUEST,
    GET_USER_FROM_TOKEN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    PASSWORD_RESET_FAILURE,
    PASSWORD_RESET_LINK_SENT_CLEAR,
    PASSWORD_RESET_LINK_SENT_FAILURE,
    PASSWORD_RESET_LINK_SENT_SUCCESS,
    PASSWORD_RESET_SUCCESS,
} from "./ActionType";

const initialState = {
    token: null,
    user: null,
    tokenLoading: false,
    userLoading: false,
    loginError: null,
    tokenError: null,
    emailError: null,
    passwordResetLinkSent: null,
    passwordResetSuccess: null,
    passwordResetError: null,
}

export const loginReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOGIN_REQUEST:
            return { ...state, tokenLoading: true };
        case LOGIN_SUCCESS:
            return { ...state, tokenLoading: false, token: payload };
        case LOGIN_FAILURE:
            return { ...state, tokenLoading: false, loginError: payload };
        case GET_USER_FROM_TOKEN_REQUEST:
            return { ...state, userLoading: true };
        case GET_USER_FROM_TOKEN_SUCCESS:
            return { ...state, userLoading: false, user: payload };
        case GET_USER_FROM_TOKEN_FAILURE:
            return { ...state, userLoading: false, tokenError: payload };
        case CLEAR_LOGIN_ERROR:
            return { ...state, loginError: null };
        case PASSWORD_RESET_LINK_SENT_SUCCESS:
            return { ...state, passwordResetLinkSent: payload };
        case PASSWORD_RESET_LINK_SENT_FAILURE:
            return { ...state, emailError: payload };
        case PASSWORD_RESET_LINK_SENT_CLEAR:
            return {...state, passwordResetLinkSent: null, emailError: null};
        case PASSWORD_RESET_SUCCESS:
            return { ...state, passwordResetSuccess: payload };
        case PASSWORD_RESET_FAILURE:
            return { ...state, passwordResetError: payload };
        case CLEAR_PASSWORD_RESET:
            return { ...state, passwordResetSuccess: null, passwordResetError: null };
        default:
            return state;
    }
}