import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants";

export const getSubject = createAsyncThunk(
  "subject/getSubject",
  async (data, thunkAPI) => {
    try {
      const flag = await localStorage.getItem("flag");
      const response = await axios.get(`${API_URL}/subject/${flag}`);
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const findSubject = createAsyncThunk(
  "subject/findSubject",
  async (jobId, thunkAPI) => {
    try {
      const flag = await localStorage.getItem("flag");
      const response = await axios.get(
        `${API_URL}/subject/${jobId}/find/${flag}`
      );
      //   await getFaculty();
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const deleteSubject = createAsyncThunk(
  "subject/deleteSubject",
  async (jobId, thunkAPI) => {
    try {
      const flag = await localStorage.getItem("flag");
      const response = await axios.post(
        `${API_URL}/subject/${jobId}/delete/${flag}`
      );
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateSubject = createAsyncThunk(
  "subject/updateSubject",
  async (data, thunkAPI) => {
    try {
      const flag = await localStorage.getItem("flag");
      const response = await axios.post(
        `${API_URL}/subject/${data.id_subject}/update/${flag}`,
        data
      );
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const addSubject = createAsyncThunk("subject/addSubject", async (data, thunkAPI) => {
  try {
    const flag = await localStorage.getItem("flag");
    const response = await axios.post(`${API_URL}/subject/add/${flag}`, data);
    return response.data.data.recordset;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const subjectSlice = createSlice({
  name: "subject",
  initialState: {
    loading: false,
    subject: [],
    subjectRecord: null,
    idSubject: null,
  },
  reducers: {
    clearState: (state, action) => {
      state.subjectRecord = null;
    },
    getSubjectAction: (state, action) => {
      state.subject = action.payload;
    },
    deleteSubjectAction: (state, action) => {
      state.subject = state.subject.filter(
        (record) => record.id_subject !== action.payload
      );
    },
    findIdDelete: (state, action) => {
      state.idSubject = state.subject.filter(
        (record) => record.id_subject === action.payload
      );
    },
    updateSubjectAction: (state, action) => {
      state.subjectRecord = state.subjectRecord.map((record) =>
        record.id_subject === action.payload.id_subject ? action.payload : record
      );
    },
  },
  extraReducers: {
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
    [findSubject.pending]: (state, action) => {
      state.loading = true;
    },
    [findSubject.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.subjectRecord = action.payload;
    },
    [findSubject.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [addSubject.pending]: (state, action) => {
      state.loading = true;
    },
    [addSubject.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [addSubject.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [deleteSubject.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteSubject.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [deleteSubject.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [updateSubject.pending]: (state, action) => {
      state.loading = true;
    },
    [updateSubject.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [updateSubject.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
  },
});

export default subjectSlice;
