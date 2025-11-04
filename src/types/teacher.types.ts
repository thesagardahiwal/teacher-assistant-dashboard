export interface ITeacher {
  _id: string;
  teacherId: string;
  name: string;
  email: string;
  phone?: string;
  passwordHash: string;
  department: string;
  designation?: string;
  subjects: string[];
  batches: string[];
  role: "Teacher" | "Admin" | "Principal";
  leaveBalance: {
    casual: number;
    sick: number;
    earned: number;
  };
  profilePic?: string;
  createdAt: Date;
  updatedAt: Date;
}