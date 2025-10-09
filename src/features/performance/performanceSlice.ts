import { createSlice } from "@reduxjs/toolkit";
import { fetchPerformanceReport } from "./performanceThunks";

interface PerformanceState {
  report: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: PerformanceState = {
  report: null,
  loading: false,
  error: null,
};

const performanceSlice = createSlice({
  name: "performance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPerformanceReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPerformanceReport.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload;
      })
      .addCase(fetchPerformanceReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default performanceSlice.reducer;
