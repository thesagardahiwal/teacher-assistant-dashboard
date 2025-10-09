export interface IBatch {
  batchId: string;
  name: string; // e.g., "CSE-A"
  year: string; // FE, SE, TE, BE
  department: string;
  students: string[];
  subjects: string[];
  teachers: string[];
  createdAt: Date;
  updatedAt: Date;
}