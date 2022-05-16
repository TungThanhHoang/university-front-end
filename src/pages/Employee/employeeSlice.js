import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants";

export const getEmployee = createAsyncThunk(
  "employee/getEmployee",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/employee`);
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const findEmployee = createAsyncThunk(
  "employee/findEmployee",
  async (employeeId, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}/employee/${employeeId}/find`
      );
      //   await getFaculty();
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getEmployeePositionFaculty = createAsyncThunk(
  "employee/getEmployeePositionFaculty",
  async (employeeId, thunkAPI) => {
    try {
      const flag = await localStorage.getItem("flag");
      const response = await axios.get(
        `${API_URL}/employee/get/position-faculty/${flag.toLowerCase()}`
      );
      //   await getFaculty();
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const deleteEmployee = createAsyncThunk(
  "employee/deleteEmployee",
  async (employeeId, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/employee/${employeeId}/delete`
      );
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateEmployee = createAsyncThunk(
  "employee/updateEmployee",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/employee/${data.id_emp}/update`,
        data
      );
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addEmployee = createAsyncThunk(
  "employee/addEmployee",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/employee/add`, data);
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateEmployeePositionFaculty = createAsyncThunk(
  "employee/updateEmployeePositionFac",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/employee/${data.id_emp}/update-position`, data);
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    loading: false,
    employee: [],
    employeePositionFac: [],
    employeeRecord: null,
    idEmployee: null,
    idEmployeePosition: null,
  },
  reducers: {
    clearState: (state, action) => {
      state.employeeRecord = null;
    },
    getEmployeeAction: (state, action) => {
      state.employee = action.payload;
    },
    deleteEmployeeAction: (state, action) => {
      state.employee = state.employee.filter(
        (record) => record.id_emp?.trim() !== action.payload
      );
    },
    findIdDelete: (state, action) => {
      state.idEmployee = state.employee.filter(
        (record) => record.id_emp?.trim() === action.payload
      );
    },
    findIdEmployeePosition: (state, action) => {
      state.idEmployeePosition = state.employee.filter(
        (record) => record.id_emp?.trim() === action.payload
      );
    },
    updateEmployeeAction: (state, action) => {
      state.employeeRecord = state.employeeRecord.map((record) =>
        record.id_emp === action.payload.id_emp ? action.payload : record
      );
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
    [findEmployee.pending]: (state, action) => {
      state.loading = true;
    },
    [findEmployee.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.employeeRecord = action.payload;
    },
    [findEmployee.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [addEmployee.pending]: (state, action) => {
      state.loading = true;
    },
    [addEmployee.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [addEmployee.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [deleteEmployee.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteEmployee.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [deleteEmployee.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [updateEmployee.pending]: (state, action) => {
      state.loading = true;
    },
    [updateEmployee.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [updateEmployee.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [getEmployeePositionFaculty.pending]: (state, action) => {
      state.loading = true;
    },
    [getEmployeePositionFaculty.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.employeePositionFac = action.payload;
    },
    [getEmployeePositionFaculty.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [updateEmployeePositionFaculty.pending]: (state, action) => {
      state.loading = true;
    },
    [updateEmployeePositionFaculty.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [updateEmployeePositionFaculty.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
  },
});

export default employeeSlice;
