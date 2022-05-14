import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants";
export const fetchUniversities = createAsyncThunk(
  "select/getUniversity",
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/university/` );
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const findUniversity = createAsyncThunk(
  "find/findUniversity",
  async ( thunkAPI) => {
    try {
      const flag = await localStorage.getItem("flag");
      const response = await axios.get(`${API_URL}/university/find/${flag}` );
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const findUniversityMain = createAsyncThunk(
  "find/findUniversityMain",
  async ( thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/mainuniversity` );
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const selectUniversitySlice = createSlice({
  name: "selectUniversity",
  initialState: {
    university: [],
    loading: false,
    error: "",
    select: "",
    universityId:"",
    universityMainId:""
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
    [findUniversity.pending]: (state , action) =>{
      state.loading = true;
    },
    [findUniversity.fulfilled]: (state , action) =>{
      state.loading = false;
      state.universityId = action.payload;
      state.error = ""
    },
    [fetchUniversities.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [findUniversityMain.pending]: (state , action) =>{
      state.loading = true;
    },
    [findUniversityMain.fulfilled]: (state , action) =>{
      state.loading = false;
      state.universityId = action.payload;
      state.error = ""
    },
    [findUniversityMain.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export default selectUniversitySlice;
