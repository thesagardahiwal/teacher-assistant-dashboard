import { attendanceService } from "@/services";
import { Attendance } from "@/services/attendanceService";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const markAttendance = createAsyncThunk(
  "attendance/mark",
  async (payload: Partial<Attendance>, thunkAPI) => {
    try {
      const res = await attendanceService.mark(payload);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchAttendanceByBatch = createAsyncThunk(
  "attendance/fetchByBatch",
  async (batchId: string, thunkAPI) => {
    try {
      const res = await attendanceService.getBySession(batchId);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
