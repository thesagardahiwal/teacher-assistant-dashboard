import { fetchHandler } from "@/lib/apiClient";
import { IStudent } from "@/types/student.types";

export interface Student extends IStudent {
  _id: string;
}

export const studentService = {
  getAll: () => fetchHandler.get<Student[]>("/students"),

  getById: (id: string) => fetchHandler.get<Student>(`/students/${id}`),
  importOne: (data: Partial<Student>) => fetchHandler.post<Student>("/students", data),
  import: (students: IStudent[]) => fetchHandler.post("/students/import", {students : students}),

  update: (id: string, data: Partial<Student>) =>
    fetchHandler.put<Student>(`/students/${id}`, data),

  remove: (id: string) => fetchHandler.delete<{ deletedId: string }>(`/students/${id}`),
};
