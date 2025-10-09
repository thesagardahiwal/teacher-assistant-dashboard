import { fetchHandler } from "@/lib/apiClient";
import { IAssignment } from "@/types/assessment.types";

export interface Assignment extends IAssignment {
  _id: string;
}

export const assignmentService = {
  getAll: () => fetchHandler.get<Assignment[]>("/assignments"),
  create: (data: Partial<Assignment>) => fetchHandler.post<Assignment>("/assignments", data),
  getById: (id: string) => fetchHandler.get<Assignment>(`/assignments/${id}`),
};
