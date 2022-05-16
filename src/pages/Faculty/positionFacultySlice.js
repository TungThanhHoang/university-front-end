import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants";

export const getPositionFaculty = createAsyncThunk(
  "position/getPositionFaculty",
  async (position, thunkAPI) => {
    try {
      const flag = await localStorage.getItem("flag");
      const response = await axios.get(`${API_URL}/position-faculty/${position}/get/${flag}`);
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.reponse.data);
    }
  }
);

 const positionFacultySlice = createSlice({
  name: "positionFaculty",
  initialState: {
    isLoading: false,
    error: null,
    positionFaculty: [],
  },
  reducers: {},
  extraReducers:{
    [getPositionFaculty.pending]: (state, action) => {
        state.isLoading = true;
    },
    [getPositionFaculty.fulfilled]: (state, action) => {
        state.loading = false;
        state.error = null;
        state.positionFaculty = action.payload
    },
    [getPositionFaculty.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.msg;
    }
  }
});

export default positionFacultySlice;