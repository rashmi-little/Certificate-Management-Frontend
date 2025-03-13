import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./login/Reducer";


export const  store = configureStore({
    reducer: {
        login: loginReducer
    },
})