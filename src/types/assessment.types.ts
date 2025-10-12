export interface IAssignment {
  _id: string;
  title: string;
  description: string;
  subject: string;
  batch: string;
  teacher: string;
  dueDate: Date;
  maxMarks: number;
  attachments?: string[];

  submissions: {
    student: string;
    submittedAt: Date;
    fileUrl?: string;
    marks?: number;
    remarks?: string;
    status: "Pending" | "Submitted" | "Graded";
  }[];
}
