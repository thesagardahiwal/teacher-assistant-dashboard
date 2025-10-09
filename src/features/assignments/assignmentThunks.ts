import { assignmentService } from "@/services";
import { Assignment } from "@/services/assignmentService";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const createAssignment = createAsyncThunk(
  "assignments/create",
  async (payload: Partial<Assignment>, thunkAPI) => {
    try {
      const res = await assignmentService.create(payload);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const evaluateAssignment = createAsyncThunk(
  "assignments/evaluate",
  async (payload: any, thunkAPI) => {
    try {
    //   const res = await assignmentService.evaluate(payload);
      return null;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchAssignments = createAsyncThunk(
  "assignments/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await assignmentService.getAll();
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
