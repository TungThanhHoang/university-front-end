import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants";

export const getJob = createAsyncThunk(
  "job/getJob",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/job`);
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const findJob = createAsyncThunk(
  "job/findJob",
  async (jobId, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/job/${jobId}/find` );
    //   await getFaculty();
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const deleteJob = createAsyncThunk(
  "job/deleteJob",
  async (jobId, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/job/${jobId}/delete` );
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateJob = createAsyncThunk(
  "job/updateJob",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/job/${data.id_job}/update/` , data );
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const addJob = createAsyncThunk(
  "job/addJob",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/job/add` , data);
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


const jobSlice = createSlice({
  name: "job",
  initialState: {
    loading: false,
    job: [],
    jobRecord:null,
    idJob: null

  },
  reducers: {
    clearState: (state, action) => {
      state.jobRecord = null  
    },
    getJobAction: (state, action) => {
      state.job = action.payload;  
    },
    deleteJobAction: (state, action) => {
      state.job = state.job.filter( record => record.id_job !== action.payload)
    },
    findIdDelete: (state , action) =>{
      state.idJob = state.job.filter( record => record.id_job === action.payload )
    }
    ,
    updateJobAction: (state, action) => {
      state.jobRecord = state.jobRecord.map( record => record.id_job === action.payload.id_job ? action.payload : record)
    }
  },
  extraReducers: {
    [getJob.pending]: (state, action) => {
      state.loading = true;
    },
    [getJob.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.job = action.payload
    },
    [getJob.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [findJob.pending]: (state, action) => {
      state.loading = true;
    },
    [findJob.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.jobRecord = action.payload;
    },
    [findJob.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [addJob.pending]: (state, action) => {
      state.loading = true;
    },
    [addJob.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [addJob.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [deleteJob.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteJob.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [deleteJob.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [updateJob.pending]: (state, action) => {
      state.loading = true;
    },
    [updateJob.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [updateJob.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    }
  }
});

export default jobSlice;
