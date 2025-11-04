import { IBatch } from "./batch.types";
import { ITeacher } from "./teacher.types";

export interface Subject {
  _id: string;
  name: string;
  code: string;
  department: string;
  year: number;
  semester: number;
  credits?: number;
  description?: string;

  batch: string;
  teacher: string;

  syllabus: {
    module: string;
    topics: string[];
    completedTopics: string[];
    proofs: string[];
  }[];

  assignments: string[];
  createdAt: string;
  updatedAt: string;
}


export interface ISubject {
  _id: string;
  name: string;
  code: string;
  department: string;
  year: number;
  semester: number;
  credits?: number;
  description?: string;

  batch: IBatch;
  teacher: ITeacher;

  syllabus: {
    module: string;
    topics: string[];
    completedTopics: string[];
    proofs: string[];
  }[];

  assignments: string[];
  createdAt: string;
  updatedAt: string;
}
