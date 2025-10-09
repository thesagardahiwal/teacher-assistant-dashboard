import { fetchHandler } from "@/lib/apiClient";
import { IAttendance } from "@/types/attendace.types";

export interface Attendance extends IAttendance {
  _id: string;
}

export const attendanceService = {
  mark: (data: Partial<Attendance>) =>
    fetchHandler.post<Attendance>("/attendance", data),

  getBySession: (sessionId: string) =>
    fetchHandler.get<Attendance>(`/attendance/${sessionId}`),
};
