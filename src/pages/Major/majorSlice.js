import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants";

export const getMajorAll = createAsyncThunk(
  "major/getMajorAll",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/major/all`);
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
      const flag = await localStorage.getItem("flag");
      const response = await axios.get(`${API_URL}/major/${flag}`);
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const findMajor = createAsyncThunk(
  "major/findMajor",
  async (jobId, thunkAPI) => {
    try {
      const flag = await localStorage.getItem("flag");
      const response = await axios.get(
        `${API_URL}/major/${jobId}/find/${flag}`
      );
      //   await getFaculty();
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const deleteMajor = createAsyncThunk(
  "major/deleteMajor",
  async (jobId, thunkAPI) => {
    try {
      const flag = await localStorage.getItem("flag");
      const response = await axios.post(
        `${API_URL}/major/${jobId}/delete/${flag}`
      );
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateMajor = createAsyncThunk(
  "major/updateMajor",
  async (data, thunkAPI) => {
    try {
      const flag = await localStorage.getItem("flag");
      const response = await axios.post(
        `${API_URL}/major/${data.id_major}/update/${flag}`,
        data
      );
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const addMajor = createAsyncThunk("major/addMajor", async (data, thunkAPI) => {
  try {
    const flag = await localStorage.getItem("flag");
    const response = await axios.post(`${API_URL}/major/add/${flag}`, data);
    return response.data.data.recordset;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const majorSlice = createSlice({
  name: "major",
  initialState: {
    loading: false,
    major: [],
    majorAll:[],
    majorRecord: null,
    idMajor: null,
  },
  reducers: {
    clearState: (state, action) => {
      state.majorRecord = null;
    },
    getMajorAction: (state, action) => {
      state.major = action.payload;
    },
    deleteMajorAction: (state, action) => {
      state.major = state.major.filter(
        (record) => record.id_major !== action.payload
      );
    },
    findIdDelete: (state, action) => {
      state.idMajor = state.major.filter(
        (record) => record.id_major === action.payload
      );
    },
    updateMajorAction: (state, action) => {
      state.jobRecord = state.majorRecord.map((record) =>
        record.id_major === action.payload.id_major ? action.payload : record
      );
    },
  },
  extraReducers: {
    [getMajorAll.pending]: (state, action) => {
      state.loading = true;
    },
    [getMajorAll.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.majorAll = action.payload;
    },
    [getMajorAll.rejected]: (state, action) => {
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
    [findMajor.pending]: (state, action) => {
      state.loading = true;
    },
    [findMajor.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.majorRecord = action.payload;
    },
    [findMajor.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [addMajor.pending]: (state, action) => {
      state.loading = true;
    },
    [addMajor.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [addMajor.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [deleteMajor.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteMajor.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [deleteMajor.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [updateMajor.pending]: (state, action) => {
      state.loading = true;
    },
    [updateMajor.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [updateMajor.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
  },
});

export default majorSlice;
