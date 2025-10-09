import { fetchHandler } from "@/lib/apiClient";

export interface TeacherPerformance {
    teacherId: string;
    teacherAttendancePercent: string;
    avgStudentAttendance: string;
    avgAssessments: string;
    performanceScore: string;
}

export const teacherPerformanceService = {
    get: (teacherId: string) => fetchHandler.get<TeacherPerformance>(`/teacher-performance/${teacherId}`),
};
