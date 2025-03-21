import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./login/Reducer";
import { userReducer } from "./user/Reducer";


export const  store = configureStore({
    reducer: {
        login: loginReducer,
        user: userReducer
    },
})