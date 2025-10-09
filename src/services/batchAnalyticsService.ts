import { fetchHandler } from "@/lib/apiClient";

export interface BatchAnalytics {
    batchId: string,
    subjectId: string,
    avgAttendance: string,
    topPerformers: any[],
    lowPerformers: any[],
    totalStudents: number,
    studentReports: any[]
}

export const batchAnalyticsService = {
    get: (batchId: string) => fetchHandler.get<BatchAnalytics>(`/batch-analytics/${batchId}`),
};
