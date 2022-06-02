import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants";

export const getClass = createAsyncThunk(
  "class/getClass",
  async (data, thunkAPI) => {
    try {
      const flag = await localStorage.getItem("flag");
      const response = await axios.get(`${API_URL}/class/${flag}`);
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const findClass = createAsyncThunk(
  "class/findClass",
  async (jobId, thunkAPI) => {
    try {
      const flag = await localStorage.getItem("flag");
      const response = await axios.get(
        `${API_URL}/class/${jobId}/find/${flag}`
      );
      //   await getFaculty();
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const deleteClass = createAsyncThunk(
  "class/deleteClass",
  async (jobId, thunkAPI) => {
    try {
      const flag = await localStorage.getItem("flag");
      const response = await axios.post(
        `${API_URL}/class/${jobId}/delete/${flag}`
      );
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateClass = createAsyncThunk(
  "class/updateClass",
  async (data, thunkAPI) => {
    try {
      const flag = await localStorage.getItem("flag");
      const response = await axios.post(
        `${API_URL}/class/${data.id_class}/update/${flag}`,
        data
      );
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const addClass = createAsyncThunk(
  "class/addClass",
  async (data, thunkAPI) => {
    try {
      const flag = await localStorage.getItem("flag");
      const response = await axios.post(`${API_URL}/class/add/${flag}`, data);
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const findClassView = createAsyncThunk(
  "class/findClassView",
  async (facultyId, thunkAPI) => {
    try {
      const flag = await localStorage.getItem("flag");
      const response = await axios.get(
        `${API_URL}/class/${facultyId}/get-student/${flag}`
      );
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const classSlice = createSlice({
  name: "class",
  initialState: {
    loading: false,
    class: [],
    classRecord: null,
    idClass: null,
    classRecordView: null,
    idClassView: null,
  },
  reducers: {
    clearState: (state, action) => {
      state.classRecord = null;
      state.classRecordView = null;
      state.idClassView = null;
    },
    getClassAction: (state, action) => {
      state.class = action.payload;
    },
    deleteClassAction: (state, action) => {
      state.class = state.class.filter(
        (record) => record.id_class.trim() !== action.payload
      );
    },
    findIdDelete: (state, action) => {
      state.idClass = state.class.filter(
        (record) => record.id_class === action.payload
      );
    },
    findIdView: (state, action) => {
      state.idClassView = state.class.filter(
        (record) => record.id_class.trim() === action.payload
      );
    },
    updateClassAction: (state, action) => {
      state.classRecord = state.classRecord.map((record) =>
        record.id_class === action.payload.id_class ? action.payload : record
      );
    },
  },
  extraReducers: {
    [getClass.pending]: (state, action) => {
      state.loading = true;
    },
    [getClass.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.class = action.payload;
    },
    [getClass.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [findClass.pending]: (state, action) => {
      state.loading = true;
    },
    [findClass.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.classRecord = action.payload;
    },
    [findClass.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [addClass.pending]: (state, action) => {
      state.loading = true;
    },
    [addClass.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [addClass.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [deleteClass.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteClass.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [deleteClass.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [updateClass.pending]: (state, action) => {
      state.loading = true;
    },
    [updateClass.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [updateClass.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [findClassView.pending]: (state, action) => {
      state.loading = true;
    },
    [findClassView.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.classRecordView = action.payload;
    },
    [findClassView.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
  },
});

export default classSlice;
