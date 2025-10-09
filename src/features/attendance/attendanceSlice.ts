import { createSlice } from "@reduxjs/toolkit";
import { markAttendance, fetchAttendanceByBatch } from "./attendanceThunks";
import { Attendance } from "@/services/attendanceService";

interface AttendanceState {
  attendance: Attendance | null;
  loading: boolean;
  error: string | null;
}

const initialState: AttendanceState = {
  attendance: null,
  loading: false,
  error: null,
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(markAttendance.pending, (state) => {
        state.loading = true;
      })
      .addCase(markAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.attendance = action.payload || null;
      })
      .addCase(markAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAttendanceByBatch.fulfilled, (state, action) => {
        state.attendance = action.payload || null;
      });
  },
});

export default attendanceSlice.reducer;
