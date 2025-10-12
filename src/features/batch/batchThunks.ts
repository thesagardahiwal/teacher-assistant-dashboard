import { createAsyncThunk } from "@reduxjs/toolkit";
import { batchService } from "@/services/batchService";

export const fetchBatches = createAsyncThunk(
  "batches/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await batchService.getAll();
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createBatch = createAsyncThunk(
  "batches/create",
  async (data: any, thunkAPI) => {
    try {
      const res = await batchService.create(data);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateBatch = createAsyncThunk(
  "batches/update",
  async ({ batchId, data }: { batchId: string; data: any }, thunkAPI) => {
    try {
      const res = await batchService.update(batchId, data);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteBatch = createAsyncThunk(
  "batches/delete",
  async (batchId: string, thunkAPI) => {
    try {
      const res = await batchService.remove(batchId);
      return { batchId, message: res.message };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
