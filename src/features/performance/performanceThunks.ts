import { teacherPerformanceService } from "@/services";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchPerformanceReport = createAsyncThunk(
  "performance/fetchReport",
  async (teacherId: string, thunkAPI) => {
    try {
      const res = await teacherPerformanceService.get(teacherId);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
