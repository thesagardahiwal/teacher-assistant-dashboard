export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export interface Student {
  _id: string;
  name: string;
  rollNumber: string;
}

export interface Classroom {
  _id: string;
  subject: string;
  teacher: string | User; // Now references User instead of Teacher
  students: Array<string | Student>;
  createdAt?: string;
  updatedAt?: string;
}

export type ClassroomFormValues = {
  subject: string;
  teacher: string; // Just store the ID
  students: string[];
};