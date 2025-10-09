import { createSlice } from "@reduxjs/toolkit";
import { addDiaryEntry, fetchDiaryEntries } from "./diaryThunks";
import { TeachingDiary } from "@/services/teachingDiaryService";

interface DiaryState {
  entries: any[];
  loading: boolean;
  error: string | null;
}

const initialState: DiaryState = {
  entries: [],
  loading: false,
  error: null,
};

const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiaryEntries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDiaryEntries.fulfilled, (state, action) => {
        state.loading = false;
        state.entries = action.payload as any as TeachingDiary[] || [];
      })
      .addCase(addDiaryEntry.fulfilled, (state, action) => {
        state.entries.push(action.payload);
      })
      .addCase(addDiaryEntry.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default diarySlice.reducer;
