import { createSlice } from "@reduxjs/toolkit";
import { createAssignment, evaluateAssignment, fetchAssignments } from "./assignmentThunks";

interface AssignmentState {
  assignments: any[];
  loading: boolean;
  error: string | null;
}

const initialState: AssignmentState = {
  assignments: [],
  loading: false,
  error: null,
};

const assignmentSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAssignment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAssignment.fulfilled, (state, action) => {
        state.loading = false;
        state.assignments.push(action.payload);
      })
      .addCase(fetchAssignments.fulfilled, (state, action) => {
        state.assignments = action.payload as any[] || [];
      })
      .addCase(evaluateAssignment.fulfilled, (state, action) => {
        // const updated = state.assignments.map((a) =>
        //   a._id === action.payload?._id ? action.payload : a
        // );
        // state.assignments = updated;
      })
      .addCase(createAssignment.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default assignmentSlice.reducer;
