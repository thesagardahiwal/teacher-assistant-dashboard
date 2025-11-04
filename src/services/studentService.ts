// services/student.service.ts
import { fetchHandler } from "@/lib/apiClient";
import { IStudent, Student } from "@/types/student.types";

export interface StudentFilters {
  year?: string;
  department?: string;
  batch?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface StudentsResponse {
  students: Student[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalStudents: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage: number | null;
    prevPage: number | null;
    limit: number;
  };
  filters: {
    year?: string;
    department?: string;
    batch?: string;
    search?: string;
  };
}

export const studentService = {
  getAll: (filters: StudentFilters | null) => {
    const params = new URLSearchParams();
    
    if (filters?.year) params.append('year', filters.year);
    if (filters?.department) params.append('department', filters.department);
    if (filters?.batch) params.append('batch', filters.batch);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    
    const queryString = params.toString();
    const url = queryString ? `/students?${queryString}` : '/students';
    
    return fetchHandler.get<StudentsResponse>(url);
  },

  getById: (id: string) => fetchHandler.get<Student>(`/students/${id}`),
  importOne: (data: Partial<Student>) => fetchHandler.post<Student>("/students", data),
  import: (students: IStudent[]) => fetchHandler.post("/students/import", {students : students}),

  update: (id: string, data: Partial<Student>) =>
    fetchHandler.put<Student>(`/students/${id}`, data),

  remove: (id: string) => fetchHandler.delete<{ deletedId: string }>(`/students/${id}`),
};