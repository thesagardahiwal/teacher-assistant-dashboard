import { createSlice } from "@reduxjs/toolkit";
import { createAssignment, evaluateAssignment, fetchAssignments } from "./assignmentThunks";
import { IAssignment } from "@/types/assessment.types";

interface AssignmentState {
  assignments: IAssignment[];
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
        const assignment = action.payload;
        if (!assignment) return;
        state.assignments.push(assignment);
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
