import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import historySlice from "./historySlice";

const store = configureStore({
    reducer: {
        app: appSlice,
        history: historySlice,
    },
});

export default store;
