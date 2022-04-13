import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getUniversity from "../../api/universityApi";

export const fetchUniversities = createAsyncThunk(
  "select/getUniversity",
  async () => {
    const currentResult = await getUniversity()
    return currentResult.data;
  }
);

const selectUniversitySlice = createSlice({
  name: "selectUniversity",
  initialState: {
    university: "",
    loading: false,
    error: "",
    select: "",
  },
  reducers: {
    selectUniversity: (state, action) => {
      state.select = action.payload;
    },
  },

  extraReducers: {
    [fetchUniversities.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchUniversities.fulfilled]: (state, action) => {
      state.loading = false;
      state.university = action.payload;
      state.error = ""
    },
    [fetchUniversities.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export default selectUniversitySlice;
