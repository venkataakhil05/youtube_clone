import { createSlice } from "@reduxjs/toolkit";

const historySlice = createSlice({
    name: "history",
    initialState: {
        videos: [],
    },
    reducers: {
        addToHistory: (state, action) => {
            // Avoid duplicates: remove if exists, then add to top
            const existingIndex = state.videos.findIndex(
                (video) => video.id === action.payload.id
            );
            if (existingIndex >= 0) {
                state.videos.splice(existingIndex, 1);
            }
            state.videos.unshift(action.payload);
        },
        clearHistory: (state) => {
            state.videos = [];
        },
    },
});

export const { addToHistory, clearHistory } = historySlice.actions;
export default historySlice.reducer;
