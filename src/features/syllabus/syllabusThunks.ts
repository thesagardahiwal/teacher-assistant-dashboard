import { syllabusService } from "@/services";
import { Syllabus } from "@/services/syllabusService";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const updateSyllabus = createAsyncThunk(
  "syllabus/update",
  async (payload: { subjectId: string; data: Partial<Syllabus> }, thunkAPI) => {
    try {
      const res = await syllabusService.update(payload.subjectId, payload.data);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchSyllabus = createAsyncThunk(
  "syllabus/fetch",
  async (subjectId: string, thunkAPI) => {
    try {
      const res = await syllabusService.getBySubject(subjectId);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
