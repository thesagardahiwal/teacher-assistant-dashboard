import { createSlice } from "@reduxjs/toolkit";
import { fetchStudents, importStudents } from "./studentThunks";

interface StudentState {
  students: any[];
  loading: boolean;
  error: string | null;
}

const initialState: StudentState = {
  students: [],
  loading: false,
  error: null,
};

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload || [];
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(importStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(importStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = [...state.students, ...(action.payload as any[])];
      })
      .addCase(importStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default studentSlice.reducer;
