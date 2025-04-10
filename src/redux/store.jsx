import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./login/Reducer";
import { userReducer } from "./user/Reducer";
import categoryReducer from "./Category/Reducer";
import {
  requestLogReducer,
  requestViewReducer,
  updateRequestReducer,
} from "./requestLog/Reducer";
import certificateRecipientReducer from "./certificateRecipient/Reducer";
import editRecipientReducer from "./certificateRecipient/editRecipientReducer";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
    categories: categoryReducer,
    requestLog: requestLogReducer,
    requestView: requestViewReducer,
    updateRequest: updateRequestReducer,
    certificateRecipient: certificateRecipientReducer,
    updateRecipient:editRecipientReducer
  },
});
