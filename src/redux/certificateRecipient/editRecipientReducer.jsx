// editRecipientReducer.js

import {
  EDIT_CERTIFICATE_RECIPIENT_FAILURE,
  EDIT_CERTIFICATE_RECIPIENT_REQUEST,
  EDIT_CERTIFICATE_RECIPIENT_SUCCESS,
} from "./actionType";

const initialState = {
  loading: false,
  success: false,
  error: null,
  editedRecipient: null,
  editMessage: null,
};

const editRecipientReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_CERTIFICATE_RECIPIENT_REQUEST:
      return { ...state, loading: true, success: false, error: null };
    case EDIT_CERTIFICATE_RECIPIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        editedRecipient: {
          certificateId: action.payload.certificateId,
          updatedData: action.payload.updatedData,
        },
        editMessage: action.payload.message,
        error: null,
      };
    case EDIT_CERTIFICATE_RECIPIENT_FAILURE:
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

export default editRecipientReducer;
