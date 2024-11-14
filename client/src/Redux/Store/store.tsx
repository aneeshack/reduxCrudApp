import { configureStore } from "@reduxjs/toolkit";
import useReducer from "../features/UserSlice";
import { thunk } from 'redux-thunk';

 const store = configureStore({
    reducer: {
        UserData:useReducer
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

export type Rootstate = ReturnType<typeof store.getState>;
export default store;