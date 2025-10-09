import { fetchHandler } from "@/lib/apiClient";
import { ILectureSession } from "@/types/lectureSession.types";

export interface Lecture extends ILectureSession {
  _id: string;
}

export const lectureService = {
  getAll: () => fetchHandler.get<Lecture[]>("/lectures"),
  getById: (id: string) => fetchHandler.get<Lecture>(`/lectures/${id}`),
  create: (data: Partial<Lecture>) => fetchHandler.post<Lecture>("/lectures", data),
};
