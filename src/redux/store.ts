import { configureStore } from "@reduxjs/toolkit";
import {Countreducer} from "./Rootreducer";
import AuthReducer from './AuthSlice';
import LangReducer from './LangSlice';
export const store = configureStore({
    reducer:{
        Countreducer:Countreducer,
        auth:AuthReducer,
        lang:LangReducer,
    }
})
