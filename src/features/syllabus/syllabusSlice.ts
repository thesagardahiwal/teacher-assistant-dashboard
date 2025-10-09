import { createSlice } from "@reduxjs/toolkit";
import { updateSyllabus, fetchSyllabus } from "./syllabusThunks";
import { Syllabus } from "@/services/syllabusService";

interface SyllabusState {
  syllabus: Syllabus | null;
  loading: boolean;
  error: string | null;
}

const initialState: SyllabusState = {
  syllabus: null,
  loading: false,
  error: null,
};

const syllabusSlice = createSlice({
  name: "syllabus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSyllabus.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSyllabus.fulfilled, (state, action) => {
        state.loading = false;
        state.syllabus = action.payload || null;
      })
      .addCase(updateSyllabus.fulfilled, (state, action) => {
        state.syllabus = action.payload || state.syllabus;
      })
      .addCase(updateSyllabus.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default syllabusSlice.reducer;
