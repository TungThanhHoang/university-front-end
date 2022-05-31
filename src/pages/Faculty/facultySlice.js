import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants";

export const getFaculty = createAsyncThunk(
  "faculty/getFaculty",
  async (data, thunkAPI) => {
    try {
      const flag = await localStorage.getItem("flag");
      const response = await axios.get(`${API_URL}/faculty/${flag}`);
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const findFaculty = createAsyncThunk(
  "faculty/findFaculty",
  async (facultyId, thunkAPI) => {
    try {
      const flag = await localStorage.getItem("flag");
      const response = await axios.get(
        `${API_URL}/faculty/${facultyId}/find/${flag}`
      );
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const findFacultyView = createAsyncThunk(
  "faculty/findFacultyView",
  async (facultyId, thunkAPI) => {
    try {
      const flag = await localStorage.getItem("flag");
      const response = await axios.get(
        `${API_URL}/faculty/${facultyId}/find/position-faculty/${flag}`
      );
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const deleteFaculty = createAsyncThunk(
  "faculty/deleteFaculty",
  async (facultyId, thunkAPI) => {
    try {
      const flag = await localStorage.getItem("flag");
      const response = await axios.post(
        `${API_URL}/faculty/${facultyId}/delete/${flag}`
      );
      await getFaculty();
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateFaculty = createAsyncThunk(
  "faculty/updateFaculty",
  async (data, thunkAPI) => {
    try {
      const flag = await localStorage.getItem("flag");
      const response = await axios.post(
        `${API_URL}/faculty/${data.id_fac}/update/${flag}`,
        data
      );
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const addFaculty = createAsyncThunk(
  "faculty/addFaculty",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/faculty/add`, data);
      await getFaculty();
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
      const flag = await localStorage.getItem("flag");
      const response = await axios.post(
        `${API_URL}/employee/${data.id_emp}/update-position/${flag}`,
        data
      );
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const facultySlice = createSlice({
  name: "faculty",
  initialState: {
    loading: false,
    faculty: [],
    facultyRecord: null,
    idFaculty: null,
    facultyRecordView: null,
    idFacultyView: null,
  },
  reducers: {
    clearState: (state, action) => {
      state.facultyRecord = null;
      state.facultyRecordView = null;
      state.idFacultyView = null;
    },
    getFacultyAction: (state, action) => {
      state.faculty = action.payload;
    },
    deleteFacultyAction: (state, action) => {
      state.faculty = state.faculty.filter(
        (record) => record.id_fac !== action.payload
      );
    },
    findIdDelete: (state, action) => {
      state.idFaculty = state.faculty.filter(
        (record) => record.id_fac === action.payload
      );
    },
    findIdView: (state, action) => {
      state.idFacultyView = state.faculty.filter(
        (record) => record.id_fac === action.payload
      );
    },
    updateFacultyEmployee: (state, action) => {
      const { id, id_pos_fac } = action.payload;
      const findData = state.facultyRecordView.find(
        (item) => item.id_emp.replace(/ +(?= )/g, "") === id
      );
      if (findData) {
        findData.id_pos_fac = Number(action.payload.id_pos_fac);
      }
    },
  },
  extraReducers: {
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
    [findFaculty.pending]: (state, action) => {
      state.loading = true;
    },
    [findFaculty.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.facultyRecord = action.payload;
    },
    [findFaculty.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [findFacultyView.pending]: (state, action) => {
      state.loading = true;
    },
    [findFacultyView.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.facultyRecordView = action.payload;
    },
    [findFacultyView.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [addFaculty.pending]: (state, action) => {
      state.loading = true;
    },
    [addFaculty.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [addFaculty.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [deleteFaculty.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteFaculty.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [deleteFaculty.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [updateFaculty.pending]: (state, action) => {
      state.loading = true;
    },
    [updateFaculty.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [updateFaculty.rejected]: (state, action) => {
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

export default facultySlice;
