import { fetchHandler } from "@/lib/apiClient";
import { ISubject } from "@/types/subject.types";

export interface Subject extends ISubject {
  _id: string;
}

export interface CreateSubjectData {
  name: string;
  code: string;
  department: string;
  year: number;
  semester: number;
  credits?: number;
  description?: string;
  batch: string;
  teacher: string;
  syllabus?: ISubject['syllabus'];
  assignments?: string[];
}

export interface UpdateSubjectData extends Partial<CreateSubjectData> {}

export interface SyllabusUpdateData {
  syllabus: ISubject['syllabus'];
}

export const subjectService = {
  // Get all subjects for a batch
  getByBatch: (batchId: string) => 
    fetchHandler.get<Subject[]>(`/subjects/batch/${batchId}`),

  getAll: () =>
    fetchHandler.get<Subject[]>('/subjects'),
  // Get single subject
  getById: (subjectId: string) => 
    fetchHandler.get<Subject>(`/subjects/${subjectId}`),

  // Create new subject
  create: (data: CreateSubjectData) => 
    fetchHandler.post<Subject>("/subjects/create", data),

  // Update subject
  update: (subjectId: string, data: UpdateSubjectData) => 
    fetchHandler.put<Subject>(`/subjects/${subjectId}`, data),

  // Delete subject
  delete: (subjectId: string) => 
    fetchHandler.delete<{ message: string; subjectId: string }>(`/subjects/${subjectId}`),

  // Update syllabus
  updateSyllabus: (subjectId: string, data: SyllabusUpdateData) => 
    fetchHandler.put<Subject>(`/subjects/${subjectId}/syllabus`, data),

  // Get subjects by teacher
  getByTeacher: (teacherId: string) => 
    fetchHandler.get<Subject[]>(`/subjects/teacher/${teacherId}`),

  // Get subjects by department and year
  getByDepartmentAndYear: (department: string, year: number) => 
    fetchHandler.get<Subject[]>(`/subjects/department/${department}/year/${year}`),
};