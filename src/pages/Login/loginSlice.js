import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants";

const setToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = ` Bearer ${token} `;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (data, thunkAPI) => {
    const tokenUser = localStorage["user_token"];
    if (tokenUser) {
      setToken(tokenUser);
    }
    try {
      const response = await axios.get(`${API_URL}/auth/me`);
      const { id_uni , username } = response.data.data.recordset[0];
      localStorage.setItem("flag", id_uni);
      localStorage.setItem("username", username);
      return response.data.data?.recordset;
    } catch (error) {
      setToken(null);
      localStorage.removeItem("user_token");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginUserAuth = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, data);
      if (response.data.success === true) {
        localStorage.setItem("user_token", response.data.accessToken);
      }
      await thunkAPI.dispatch(getUser());
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
    error: null,
    isAuth: localStorage.getItem('user_token') ? true : false,
    user:null
  },
  reducers: {
    logout: (state, action) => {
      localStorage.removeItem("user_token");
      localStorage.removeItem("flag");
      localStorage.removeItem("username");
      state.user = null;
      state.isAuth = false;
      state.error = null ;
      state.loading = false;
      window.location.reload();
      
    },
  },
  extraReducers: {
    [loginUserAuth.pending]: (state, action) => {
      state.loading = true;
    },
    [loginUserAuth.fulfilled]: (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.error = null;
    },
    [loginUserAuth.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [getUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.user = action.payload;
      state.error = null;
    },
    [getUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
  },
});

export default authLoginSlice;
