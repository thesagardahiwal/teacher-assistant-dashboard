import { fetchHandler } from "@/lib/apiClient";
import { ISyllabus } from "@/types/syllabus";

export interface Syllabus extends ISyllabus {
  _id: string;
}

export const syllabusService = {
  getBySubject: (subjectId: string) => fetchHandler.get<Syllabus>(`/syllabus/${subjectId}`),
  update: (subjectId: string, data: Partial<Syllabus>) => fetchHandler.put<Syllabus>(`/syllabus/${subjectId}`, data),
};
