import { IBatch } from "./batch.types";
import { ISubject } from "./subject.types";

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

export interface Student {
  _id: string;
  studentId: string;
  rollNumber: string;
  enrollmentNumber?: string;
  name: string;
  email?: string;
  year?: string;
  phone?: string;
  batch: IBatch; // Reference to Batch
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
    subjectId: ISubject;
    assessmentType: string;
    marksObtained: number;
    totalMarks: number;
    date: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SubjectFormData {
  name: string;
  code: string;
  department: string;
  year: string;
  semester: string;
  credits?: string;
  description?: string;
}

export interface SyllabusModule {
  module: string;
  topics: string[];
  completedTopics: string[];
  proofs: string[];
}

export interface SyllabusFormData {
  modules: SyllabusModule[];
}