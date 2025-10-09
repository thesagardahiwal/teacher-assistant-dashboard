import { fetchHandler } from "@/lib/apiClient";
import { ITeachingDiary } from "@/types/teachingDiary.types";

export interface TeachingDiary extends ITeachingDiary {
  _id: string;
}

export const teachingDiaryService = {
  getByTeacher: (teacherId: string) => fetchHandler.get<TeachingDiary[]>(`/teaching-diary/${teacherId}`),
  create: (data: Partial<TeachingDiary>) => fetchHandler.post<TeachingDiary>("/teaching-diary", data),
};
