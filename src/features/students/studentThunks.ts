// thunks/studentThunks.ts


import { StudentFilters, studentService } from "@/services/studentService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchStudents = createAsyncThunk(
  "students/",
  async (filters: StudentFilters | null, thunkAPI) => {
    try {
      const res = await studentService.getAll(filters);
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const importStudents = createAsyncThunk(
  "students/importStudents",
  async (students: any[], thunkAPI) => {
    try {
      const res = await studentService.import(students);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);