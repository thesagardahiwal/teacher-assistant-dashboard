import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import studentReducer from "@/features/students/studentSlice";
import attendanceReducer from "@/features/attendance/attendanceSlice";
import assignmentReducer from "@/features/assignments/assignmentSlice";
import syllabusReducer from "@/features/syllabus/syllabusSlice";
import diaryReducer from "@/features/diary/diarySlice";
import performanceReducer from "@/features/performance/performanceSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentReducer,
    attendance: attendanceReducer,
    assignments: assignmentReducer,
    syllabus: syllabusReducer,
    diary: diaryReducer,
    performance: performanceReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
