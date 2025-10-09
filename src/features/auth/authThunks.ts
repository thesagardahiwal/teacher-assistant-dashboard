import { createAsyncThunk } from "@reduxjs/toolkit";
import { teacherService } from "@/services/teacherService";

export const loginTeacher = createAsyncThunk(
  "auth/loginTeacher",
  
  async (data: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await teacherService.login(data);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const registerTeacher = createAsyncThunk(
  "auth/registerTeacher",
  async (data: any, thunkAPI) => {
    try {
      const res = await teacherService.register(data);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
