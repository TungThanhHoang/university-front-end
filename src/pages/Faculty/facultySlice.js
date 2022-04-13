import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants";

export const getFaculty = createAsyncThunk(
  "faculty/getFaculty",
  async (data, thunkAPI) => {
    const tokenUser = localStorage["user_token"];
    if (tokenUser) {
      setToken(tokenUser);
    }
    try {
      const response = await axios.get(`${API_URL}/faculty`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


const authLoginSlice = createSlice({
  name: "authLogin",
  initialState: {
    loading: false,
    faculty: []
  },
  reducers: {
    logout: (state, action) => {
     
    },
  },
  extraReducers: {
    [getFaculty.pending]: (state, action) => {
      state.loading = true;
    },
    [getFaculty.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.faculty = action.payload
    },
    [getFaculty.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    }
  },
});

export default authLoginSlice;
