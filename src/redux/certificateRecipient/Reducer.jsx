// reducer.js
import {
  DELETE_CERTIFICATE_RECIPIENT_FAILURE,
  DELETE_CERTIFICATE_RECIPIENT_REQUEST,
  DELETE_CERTIFICATE_RECIPIENT_SUCCESS,
} from "./actionType";

const initialState = {
  loading: false,
  success: false,
  error: null,
  deletedId: null,
};

const certificateRecipientReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_CERTIFICATE_RECIPIENT_REQUEST:
      return { ...state, loading: true, success: false, error: null };

    case DELETE_CERTIFICATE_RECIPIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        deletedId: action.payload,
        error: null,
      };

    case DELETE_CERTIFICATE_RECIPIENT_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default certificateRecipientReducer;



