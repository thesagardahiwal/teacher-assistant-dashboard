import { studentService } from "@/services";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchStudents = createAsyncThunk(
  "students/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await studentService.getAll();
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const importStudents = createAsyncThunk(
  "students/import",
  async (students: any[], thunkAPI) => {
    try {
      const res = await studentService.import(students);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
