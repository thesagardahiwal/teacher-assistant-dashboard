import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchBatches, createBatch, updateBatch, deleteBatch } from "./batchThunks";
import { Batch } from "@/services/batchService";


interface BatchState {
  list: Batch[];
  loading: boolean;
  error: string | null;
  isFetched: boolean;
  selectedBatch: Batch | null;
}

const initialState: BatchState = {
  list: [],
  loading: false,
  error: null,
  selectedBatch: null,
  isFetched: false,
};

const batchSlice = createSlice({
  name: "batches",
  initialState,
  reducers: {
    setSelectedBatch: (state, action: PayloadAction<Batch | null>) => {
      state.selectedBatch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all batches
      .addCase(fetchBatches.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBatches.fulfilled, (state, action) => {
        state.loading = false;
        state.list = Object.values(action.payload || {}) || [];
        state.isFetched = true;
      })
      .addCase(fetchBatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isFetched = true;
      })

      // Create batch
      .addCase(createBatch.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBatch.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload)
            state.list.push(action.payload);
        state.isFetched = true;
      })
      .addCase(createBatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isFetched = true;
      })

      // Update batch
      .addCase(updateBatch.fulfilled, (state, action) => {
        const updatedBatch = action.payload;
        if (!updatedBatch) return;
        const idx = state.list.findIndex(b => b.batchId === updatedBatch.batchId);
        if (idx !== -1) state.list[idx] = updatedBatch;
        state.isFetched = true;
      })

      // Delete batch
      .addCase(deleteBatch.fulfilled, (state, action) => {
        state.list = state.list.filter(b => b.batchId !== action.payload.batchId);
        state.isFetched = true;
      });
  },
});

export const { setSelectedBatch } = batchSlice.actions;
export default batchSlice.reducer;
