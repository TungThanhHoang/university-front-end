import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants";

export const getStudentAll = createAsyncThunk(
  "student/getStudentAll",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/student/all`);
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
      const response = await axios.get(`${API_URL}/student/${flag}`);
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const findStudent = createAsyncThunk(
  "student/findStudent",
  async (employeeId, thunkAPI) => {
    try {
      const flag = localStorage.getItem("flag");
      const response = await axios.get(
        `${API_URL}/student/${employeeId}/find/${flag}`
      );
      //   await getFaculty();
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getStudentPositionFaculty = createAsyncThunk(
  "student/getStudentPositionFaculty",
  async (employeeId, thunkAPI) => {
    try {
      const flag = await localStorage.getItem("flag");
      const response = await axios.get(
        `${API_URL}/student/get/class/${flag.toLowerCase()}`
      );
      //   await getFaculty();
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const deleteStudent = createAsyncThunk(
  "student/deleteStudent",
  async (employeeId, thunkAPI) => {
    try {
      const flag = await localStorage.getItem("flag");
      const response = await axios.post(
        `${API_URL}/student/${employeeId}/delete/${flag}`
      );
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateStudent = createAsyncThunk(
  "student/updateStudent",
  async (data, thunkAPI) => {
    try {
      const flag = await localStorage.getItem("flag");
      const response = await axios.post(
        `${API_URL}/student/${data.id_student}/update/${flag}`,
        data
      );
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addStudent = createAsyncThunk(
  "student/addStudent",
  async (data, thunkAPI) => {
    try {
      const flag = await localStorage.getItem("flag");
      const response = await axios.post(`${API_URL}/student/add/${flag}`, data);
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const addQR = createAsyncThunk(
  "qr/addQR",
  async (data, thunkAPI) => {
    try {
      const flag = await localStorage.getItem("flag");
      const response = await axios.post(`${API_URL}/qr/add/${flag}`, data);
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const deleteQR = createAsyncThunk(
  "qr/deleteQR",
  async (employeeId, thunkAPI) => {
    try {
      const flag = await localStorage.getItem("flag");
      const response = await axios.post(
        `${API_URL}/qr/${employeeId}/delete/${flag}`
      );
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateQR = createAsyncThunk(
  "qr/deleteQR",
  async (data, thunkAPI) => {
    try {
      const flag = await localStorage.getItem("flag");
      const response = await axios.post(
        `${API_URL}/qr/${data.id_qr}/update/${flag}` , data
      );
      return response.data.data.recordset;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const studentSlice = createSlice({
  name: "student",
  initialState: {
    loading: false,
    student: [],
    studentAll: [],
    studentPositionFac: [],
    studentRecord: null,
    idStudent: null,
    idStudentPosition: null,
    qrCode: null,
    qrStudent: null,
  },
  reducers: {
    clearState: (state, action) => {
      state.studentRecord = null;
      state.qrStudent = null;
    },
    getStudentAction: (state, action) => {
      state.student = action.payload;
    },
    deleteStudentAction: (state, action) => {
      state.student = state.student.filter(
        (record) => record.id_student?.trim() !== action.payload
      );
    },
    findIdDelete: (state, action) => {
      state.idStudent = state.student.filter(
        (record) => record.id_student?.trim() === action.payload
      );
    },
    findQRStudent: (state, action) => {
      state.qrStudent = state.student.filter(
        (record) => record.id_student?.trim() === action.payload
      );
    },
    findIdStudentPosition: (state, action) => {
      state.idStudentPosition = state.student.filter(
        (record) => record.id_student?.trim() === action.payload
      );
    },
    updateStudentAction: (state, action) => {
      state.studentRecord = state.studentRecord.map((record) =>
        record.id_student === action.payload.id_student
          ? action.payload
          : record
      );
    },
  },
  extraReducers: {

    [getStudentAll.pending]: (state, action) => {
      state.loading = true;
    },
    [getStudentAll.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.studentAll = action.payload;
    },
    [getStudentAll.rejected]: (state, action) => {
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
    [findStudent.pending]: (state, action) => {
      state.loading = true;
    },
    [findStudent.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.studentRecord = action.payload;
    },
    [findStudent.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [addStudent.pending]: (state, action) => {
      state.loading = true;
    },
    [addStudent.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [addStudent.rejected]: (state, action) => {
      state.loading = false;
      
      state.error = action.payload.msg;
    },
    [deleteStudent.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteStudent.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [deleteStudent.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [updateStudent.pending]: (state, action) => {
      state.loading = true;
    },
    [updateStudent.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [updateStudent.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [getStudentPositionFaculty.pending]: (state, action) => {
      state.loading = true;
    },
    [getStudentPositionFaculty.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.studentPositionFac = action.payload;
    },
    [getStudentPositionFaculty.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [addQR.pending]: (state, action) => {
      state.loading = true;
    },
    [addQR.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.qrCode = action.payload
    },
    [addQR.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [deleteQR.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteQR.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [deleteQR.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    },
    [updateQR.pending]: (state, action) => {
      state.loading = true;
    },
    [updateQR.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [updateQR.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.msg;
    }
  },
});

export default studentSlice;
