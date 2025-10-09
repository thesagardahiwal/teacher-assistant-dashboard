import { leaveService } from "@/services";
import { Leave } from "@/services/leaveService";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const applyLeave = createAsyncThunk(
  "leave/apply",
  async (payload: Partial<Leave>, thunkAPI) => {
    try {
      const res = await leaveService.apply(payload);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchLeaves = createAsyncThunk(
  "leave/fetch",
  async (teacherId: string, thunkAPI) => {
    try {
      const res = await leaveService.getByTeacher(teacherId);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
