import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants";

export const getMemUniversity = createAsyncThunk(
  "university/getUniversity",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/university`);
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const findMemUniversity = createAsyncThunk(
  "university/findUniversity",
  async (universityId, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}/university/${universityId}/member`
      );
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateMemUniversity = createAsyncThunk(
  "university/updateUniversity",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/university/${data.id_uni}/update`,
        data
      );
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const addMemUniversity = createAsyncThunk(
  "university/addUniversity",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/university/add`, data);
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const memberUniversitySlice = createSlice({
  name: "memberUniversity",
  initialState: {
    loading: false,
    memUniversity: [],
    memUniversityRecord: null,
    idMemUniversity: null,
  },
  reducers: {
    clearState: (state, action) => {
      state.memUniversityRecord = null;
    },
    getUniversityAction: (state, action) => {
      state.memUniversity = action.payload;
    },
    updateDepartmentAction: (state, action) => {
      state.departmentRecord = state.departmentRecord.map((record) =>
        record.id_dep === action.payload.id_fac ? action.payload : record
      );
    },
  },
  extraReducers: {
    [getMemUniversity.pending]: (state, action) => {
      state.loading = true;
    },
    [getMemUniversity.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.memUniversity = action.payload;
    },
    [getMemUniversity.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [findMemUniversity.pending]: (state, action) => {
      state.loading = true;
    },
    [findMemUniversity.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.memUniversityRecord = action.payload;
    },
    [findMemUniversity.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [addMemUniversity.pending]: (state, action) => {
      state.loading = true;
    },
    [addMemUniversity.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [addMemUniversity.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [updateMemUniversity.pending]: (state, action) => {
      state.loading = true;
    },
    [updateMemUniversity.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [updateMemUniversity.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
  },
});

export default memberUniversitySlice;
