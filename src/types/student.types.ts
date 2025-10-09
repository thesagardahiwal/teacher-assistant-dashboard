export interface IStudent {
  studentId: string;
  rollNumber: string;
  enrollmentNumber?: string;
  name: string;
  email?: string;
  year?: string;
  phone?: string;
  batch: string; // Reference to Batch
  department: string;
  guardian?: {
    name?: string;
    phone?: string;
    email?: string;
  };
  attendanceStats: {
    totalLectures: number;
    attendedLectures: number;
    percentage: number;
  };
  performance: {
    subjectId: string;
    assessmentType: string;
    marksObtained: number;
    totalMarks: number;
    date: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}