import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api.slice";
import authReducer from "./auth/auth.slice";
import { createWrapper } from "next-redux-wrapper";

const store = () =>
  configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
  });

export const wrapper = createWrapper(store);
