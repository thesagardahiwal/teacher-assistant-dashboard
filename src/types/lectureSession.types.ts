export interface ILectureSession {
  sessionId: string;
  subject: string;
  batch: string;
  teacher: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: "Scheduled" | "Rescheduled" | "Cancelled" | "Completed";
  topic?: string;
  diaryNote?: string;
  attendanceTaken: boolean;
  attendance?: string;
  createdAt: Date;
  updatedAt: Date;
}