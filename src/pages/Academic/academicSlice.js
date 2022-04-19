import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants";

export const getAcademic = createAsyncThunk(
  "academic/getAcademic",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/academic`);
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const findAcademic = createAsyncThunk(
  "academic/findAcademic",
  async (academicId, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/academic/${academicId}/find` );
    //   await getFaculty();
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const deleteAcademic = createAsyncThunk(
  "academic/deleteAcademic",
  async (academicId, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/academic/${academicId}/delete` );
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateAcademic = createAsyncThunk(
  "academic/updateAcademic",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/academic/${data.id_academic}/update/` , data );
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const addAcademic = createAsyncThunk(
  "academic/addAcademic",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/academic/add` , data);
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


const jobSlice = createSlice({
  name: "academic",
  initialState: {
    loading: false,
    academic: [],
    academicRecord:null,
    idAcademic: null

  },
  reducers: {
    clearState: (state, action) => {
      state.academicRecord = null  
    },
    getAcademicAction: (state, action) => {
      state.academic = action.payload;  
    },
    deleteAcademicAction: (state, action) => {
      state.academic = state.academic.filter( record => record.id_academic !== action.payload)
    },
    findIdDelete: (state , action) =>{
      state.idAcademic = state.academic.filter( record => record.id_academic === action.payload )
    }
    ,
    updateAcademicAction: (state, action) => {
      state.academicRecord = state.academicRecord.map( record => record.id_academic === action.payload.id_academic ? action.payload : record)
    }
  },
  extraReducers: {
    [getAcademic.pending]: (state, action) => {
      state.loading = true;
    },
    [getAcademic.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.academic = action.payload
    },
    [getAcademic.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [findAcademic.pending]: (state, action) => {
      state.loading = true;
    },
    [findAcademic.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.academicRecord = action.payload;
    },
    [findAcademic.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [addAcademic.pending]: (state, action) => {
      state.loading = true;
    },
    [addAcademic.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [addAcademic.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [deleteAcademic.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteAcademic.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [deleteAcademic.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [updateAcademic.pending]: (state, action) => {
      state.loading = true;
    },
    [updateAcademic.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [updateAcademic.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    }
  }
});

export default jobSlice;
