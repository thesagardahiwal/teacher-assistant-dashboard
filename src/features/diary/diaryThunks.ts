import { teachingDiaryService } from "@/services";
import { TeachingDiary } from "@/services/teachingDiaryService";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const addDiaryEntry = createAsyncThunk(
  "diary/addEntry",
  async (entry: Partial<TeachingDiary>, thunkAPI) => {
    try {
      const res = await teachingDiaryService.create(entry);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchDiaryEntries = createAsyncThunk(
  "diary/fetchAll",
  async (teacherId: string, thunkAPI) => {
    try {
      const res = await teachingDiaryService.getByTeacher(teacherId);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
