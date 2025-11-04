import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { 
  fetchSubjects, 
  createSubject, 
  updateSubject, 
  deleteSubject,
  updateSyllabus, 
  fetchAllSubjects
} from "./subjectThunks";
import { Subject } from "@/services/subjectService";

interface SubjectState {
  list: Subject[];
  loading: boolean;
  error: string | null;
  selectedSubject: Subject | null;
  currentBatch: string | null;
}

const initialState: SubjectState = {
  list: [],
  loading: false,
  error: null,
  selectedSubject: null,
  currentBatch: null,
};

const subjectSlice = createSlice({
  name: "subjects",
  initialState,
  reducers: {
    setSelectedSubject: (state, action: PayloadAction<Subject | null>) => {
      state.selectedSubject = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSubjects: (state) => {
      state.list = [];
      state.currentBatch = null;
    },
    updateSubjectInList: (state, action: PayloadAction<Subject>) => {
      const index = state.list.findIndex(subject => subject._id === action.payload._id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch subjects by batch
      .addCase(fetchSubjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.list = Object.values(action.payload || {}) || [];
        state.currentBatch = action.meta.arg;
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.list = [];
        state.currentBatch = null;
      })
      .addCase(fetchAllSubjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.list = Object.values(action.payload || {}) || [];
      })
      .addCase(fetchAllSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.list = [];
      })

      // Create subject
      .addCase(createSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubject.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.list.push(action.payload);
        }
      })
      .addCase(createSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update subject
      .addCase(updateSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSubject.fulfilled, (state, action) => {
        state.loading = false;
        const updatedSubject = action.payload;
        if (!updatedSubject) return;
        
        const index = state.list.findIndex(s => s._id === updatedSubject._id);
        if (index !== -1) {
          state.list[index] = updatedSubject;
        }
        
        if (state.selectedSubject?._id === updatedSubject._id) {
          state.selectedSubject = updatedSubject;
        }
      })
      .addCase(updateSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete subject
      .addCase(deleteSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSubject.fulfilled, (state, action) => {
        state.loading = false;
        const response = action.payload;
        if (!response) return;
        state.list = state.list.filter(s => s._id !== response.subjectId);
        
        if (state.selectedSubject?._id === response.subjectId) {
          state.selectedSubject = null;
        }
      })
      .addCase(deleteSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update syllabus
      .addCase(updateSyllabus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSyllabus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedSubject = action.payload;
        if (!updatedSubject) return;
        
        const index = state.list.findIndex(s => s._id === updatedSubject._id);
        if (index !== -1) {
          state.list[index] = updatedSubject;
        }
        
        if (state.selectedSubject?._id === updatedSubject._id) {
          state.selectedSubject = updatedSubject;
        }
      })
      .addCase(updateSyllabus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { 
  setSelectedSubject, 
  clearError, 
  clearSubjects,
  updateSubjectInList 
} = subjectSlice.actions;

export default subjectSlice.reducer;