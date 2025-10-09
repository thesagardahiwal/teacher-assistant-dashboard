export interface ISubject {
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
}
