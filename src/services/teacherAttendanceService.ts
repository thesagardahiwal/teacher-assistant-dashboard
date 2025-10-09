import { fetchHandler } from "@/lib/apiClient";
import { ITeacherAttendance } from "@/types/teacherAttendace.types";

export interface TeacherAttendance extends ITeacherAttendance {
  _id: string;
}

export const teacherAttendanceService = {
  mark: (data: Partial<TeacherAttendance>) => fetchHandler.post<TeacherAttendance>("/teacher-attendance", data),
  getByTeacher: (teacherId: string) => fetchHandler.get<TeacherAttendance[]>(`/teacher-attendance/${teacherId}`),
};
