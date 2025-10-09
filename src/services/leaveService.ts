import { fetchHandler } from "@/lib/apiClient";
import { ILeave } from "@/types/leave.types";

export interface Leave extends ILeave {
  _id: string;
}

export const leaveService = {
  apply: (data: Partial<Leave>) => fetchHandler.post<Leave>("/leaves", data),
  getByTeacher: (teacherId: string) => fetchHandler.get<Leave[]>(`/leaves/${teacherId}`),
  approve: (id: string) => fetchHandler.put<Leave>(`/leaves/${id}/approve`, {}),
  reject: (id: string) => fetchHandler.put<Leave>(`/leaves/${id}/reject`, {}),
};
