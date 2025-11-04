// slices/studentSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { fetchStudents, importStudents } from "./studentThunks";
import { Student } from "@/types/student.types";

interface StudentState {
  students: Student[];
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalStudents: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
  } | null;
  filters: {
    year?: string;
    department?: string;
    batch?: string;
    search?: string;
  } | null;
}

const initialState: StudentState = {
  students: [],
  loading: false,
  error: null,
  pagination: null,
  filters: {},
};

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload?.data?.students || [];
        state.pagination = action.payload?.data?.pagination || null;
        state.filters = action.payload?.data?.filters || null;
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
        // Optionally refresh the list after import
      })
      .addCase(importStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setFilters, clearFilters } = studentSlice.actions;
export default studentSlice.reducer;