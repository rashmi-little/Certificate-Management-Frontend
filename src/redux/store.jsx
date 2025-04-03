import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./login/Reducer";
import { userReducer } from "./user/Reducer";
import { certificateReducer } from "./certificate/Reducer";


export const  store = configureStore({
    reducer: {
        login: loginReducer,
        user: userReducer,
        certificate: certificateReducer
    },
})