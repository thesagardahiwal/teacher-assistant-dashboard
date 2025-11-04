import { createAsyncThunk } from "@reduxjs/toolkit";
import { 
  subjectService, 
  CreateSubjectData, 
  UpdateSubjectData,
  SyllabusUpdateData 
} from "@/services/subjectService";

// Fetch subjects by batch
export const fetchSubjects = createAsyncThunk(
  "subjects/fetchByBatch",
  async (batchId: string, { rejectWithValue }) => {
    try {
      const response = await subjectService.getByBatch(batchId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch subjects"
      );
    }
  }
);

// Fetch subjects by batch
export const fetchAllSubjects = createAsyncThunk(
  "subjects/fetchAllSubjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await subjectService.getAll();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch subjects"
      );
    }
  }
);

// Create subject
export const createSubject = createAsyncThunk(
  "subjects/create",
  async (data: CreateSubjectData, { rejectWithValue }) => {
    try {
      const response = await subjectService.create(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create subject"
      );
    }
  }
);

// Update subject
export const updateSubject = createAsyncThunk(
  "subjects/update",
  async (
    { subjectId, data }: { subjectId: string; data: UpdateSubjectData },
    { rejectWithValue }
  ) => {
    try {
      const response = await subjectService.update(subjectId, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update subject"
      );
    }
  }
);

// Delete subject
export const deleteSubject = createAsyncThunk(
  "subjects/delete",
  async (subjectId: string, { rejectWithValue }) => {
    try {
      const response = await subjectService.delete(subjectId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete subject"
      );
    }
  }
);

// Update syllabus
export const updateSyllabus = createAsyncThunk(
  "subjects/updateSyllabus",
  async (
    { subjectId, syllabus }: { subjectId: string; syllabus: SyllabusUpdateData },
    { rejectWithValue }
  ) => {
    try {
      const response = await subjectService.updateSyllabus(subjectId, syllabus);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update syllabus"
      );
    }
  }
);

// Fetch subject by ID
export const fetchSubjectById = createAsyncThunk(
  "subjects/fetchById",
  async (subjectId: string, { rejectWithValue }) => {
    try {
      const response = await subjectService.getById(subjectId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch subject"
      );
    }
  }
);

// Fetch subjects by teacher
export const fetchSubjectsByTeacher = createAsyncThunk(
  "subjects/fetchByTeacher",
  async (teacherId: string, { rejectWithValue }) => {
    try {
      const response = await subjectService.getByTeacher(teacherId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch teacher's subjects"
      );
    }
  }
);