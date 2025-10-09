import { fetchHandler } from "@/lib/apiClient";
import { ISubject } from "@/types/subject.types";

export interface Subject extends ISubject {
  _id: string;
}

export const subjectService = {
  getAll: () => fetchHandler.get<Subject[]>("/subjects"),
  create: (data: Partial<Subject>) => fetchHandler.post<Subject>("/subjects", data),
};
