import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants";

export const getEmployee = createAsyncThunk(
  "employee/getEmployee",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
      `${API_URL}/employee/${data?.toLowerCase()}`
      );
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getStudent = createAsyncThunk(
  "student/getStudent",
  async (data, thunkAPI) => {
    try {
      const flag = localStorage.getItem("flag");
      const response = await axios.get(`${API_URL}/student/${data}`);
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getSubject = createAsyncThunk(
  "subject/getSubject",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/subject/${data}`);
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getMajor = createAsyncThunk(
  "major/getMajor",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/major/${data}`);
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getDepartment = createAsyncThunk(
  "department/getDepartment",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/department/${data}`);
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getFaculty = createAsyncThunk(
  "faculty/getFaculty",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/faculty/${data}`);
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const mainSlice = createSlice({
  name: "mainSlice",
  initialState: {
    loading: false,
    employee: [],
    student: [],
    major: [],
    subject: [],
    faculty: [],
    department: [],
  },
  reducers: {
    clearState: (state, action) => {
      state.employee = null;
      state.student = null;
      state.major = null;
      state.subject = null;
      state.faculty = null;
      state.department = null;
    },
  },
  extraReducers: {
    [getEmployee.pending]: (state, action) => {
      state.loading = true;
    },
    [getEmployee.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.employee = action.payload;
    },
    [getEmployee.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [getDepartment.pending]: (state, action) => {
      state.loading = true;
    },
    [getDepartment.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.department = action.payload;
    },
    [getDepartment.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [getMajor.pending]: (state, action) => {
      state.loading = true;
    },
    [getMajor.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.major = action.payload;
    },
    [getMajor.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [getSubject.pending]: (state, action) => {
      state.loading = true;
    },
    [getSubject.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.subject = action.payload;
    },
    [getSubject.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [getStudent.pending]: (state, action) => {
      state.loading = true;
    },
    [getStudent.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.student = action.payload;
    },
    [getStudent.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [getFaculty.pending]: (state, action) => {
      state.loading = true;
    },
    [getFaculty.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.faculty = action.payload;
    },
    [getFaculty.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
  },
});

export default mainSlice;
