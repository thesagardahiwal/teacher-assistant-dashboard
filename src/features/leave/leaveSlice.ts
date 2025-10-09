import { createSlice } from "@reduxjs/toolkit";
import { applyLeave, fetchLeaves } from "./leaveThunks";

interface LeaveState {
  leaves: any[];
  loading: boolean;
  error: string | null;
}

const initialState: LeaveState = {
  leaves: [],
  loading: false,
  error: null,
};

const leaveSlice = createSlice({
  name: "leave",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(applyLeave.pending, (state) => {
        state.loading = true;
      })
      .addCase(applyLeave.fulfilled, (state, action) => {
        state.loading = false;
        state.leaves.push(action.payload);
      })
      .addCase(fetchLeaves.fulfilled, (state, action) => {
        state.leaves = action.payload as any[] || [];
      })
      .addCase(applyLeave.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default leaveSlice.reducer;
