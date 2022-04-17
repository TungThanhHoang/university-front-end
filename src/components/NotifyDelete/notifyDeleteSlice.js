import { createSlice } from "@reduxjs/toolkit";

const notifyDeleteSlice = createSlice({
    name: "notifyDelete",
    initialState: {
        isOpen: false,
    },
    reducers: {
        open: (state, action) => {
            state.isOpen = true;
        },
        close: (state, action) => {
            state.isOpen = false;
        },
    }
})

export default notifyDeleteSlice;