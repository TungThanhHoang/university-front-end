import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants";

export const getDepartment = createAsyncThunk(
  "department/getDepartment",
  async (data, thunkAPI) => {
    try {
      const flag = await localStorage.getItem("flag");
      const response = await axios.get(`${API_URL}/department/${flag}`);
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const findDepartment = createAsyncThunk(
  "department/findDepartment",
  async (departmentId, thunkAPI) => {
    try {
      const flag = await localStorage.getItem("flag");
      const response = await axios.get(`${API_URL}/department/${departmentId}/find/${flag}` );
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const deleteDepartment = createAsyncThunk(
  "department/deleteDepartment",
  async (departmentId, thunkAPI) => {
    try {
      const flag = await localStorage.getItem("flag");
      const response = await axios.post(`${API_URL}/department/${departmentId}/delete/${flag}` );
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateDepartment = createAsyncThunk(
  "department/updateDepartment",
  async (data, thunkAPI) => {
    try {
      const flag = await localStorage.getItem("flag");
      const response = await axios.post(`${API_URL}/department/${data.id_dep}/update/${flag}` , data );
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const addDepartment = createAsyncThunk(
  "department/addDepartment",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/department/add` , data);
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


const departmentSlice = createSlice({
  name: "department",
  initialState: {
    loading: false,
    department: [],
    departmentRecord:null,
    idDepartment: null

  },
  reducers: {
    clearState: (state, action) => {
      state.departmentRecord = null  
    },
    getDepartmentAction: (state, action) => {
      state.department = action.payload;  
    },
    deleteDepartmentAction: (state, action) => {
      state.department = state.department.filter( record => record.id_dep !== action.payload)
    },
    findIdDelete: (state , action) =>{
      state.idDepartment = state.department.filter( record => record.id_dep === action.payload )
    }
    ,
    updateDepartmentAction: (state, action) => {
      state.departmentRecord = state.departmentRecord.map( record => record.id_dep === action.payload.id_fac ? action.payload : record)
    }
  },
  extraReducers: {
    [getDepartment.pending]: (state, action) => {
      state.loading = true;
    },
    [getDepartment.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.department = action.payload
    },
    [getDepartment.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [findDepartment.pending]: (state, action) => {
      state.loading = true;
    },
    [findDepartment.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.departmentRecord = action.payload;
    },
    [findDepartment.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [addDepartment.pending]: (state, action) => {
      state.loading = true;
    },
    [addDepartment.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [addDepartment.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [deleteDepartment.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteDepartment.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [deleteDepartment.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [updateDepartment.pending]: (state, action) => {
      state.loading = true;
    },
    [updateDepartment.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [updateDepartment.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    }
  }
});

export default departmentSlice;
