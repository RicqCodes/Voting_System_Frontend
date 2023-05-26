import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

// Import reducers here
import { proposalApi } from "./api/api";
import appReducer from "./slices/appSlice";

export const store = configureStore({
  reducer: {
    [proposalApi.reducerPath]: proposalApi.reducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      thunk,
      proposalApi.middleware
    ),
});

setupListeners(store.dispatch);
