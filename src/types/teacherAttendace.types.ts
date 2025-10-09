export interface ITeacherAttendance extends Document {
  teacher: string;
  date: Date;
  status: "Present" | "Absent" | "On Leave";
  markedBy: string; // could be self or admin
  remarks?: string;
  createdAt: Date;
  updatedAt: Date;
}