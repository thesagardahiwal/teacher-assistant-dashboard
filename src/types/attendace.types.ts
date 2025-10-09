export interface IAttendance {
  sessionId: string; // custom ID
  subject: string;
  batch: string;
  teacher: string;
  date: Date;
  presentStudents: string[];
  absentStudents: string[];
  createdAt: Date;
  updatedAt: Date;
}
