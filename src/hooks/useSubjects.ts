"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { 
  fetchSubjects, 
  createSubject, 
  updateSubject, 
  deleteSubject,
  updateSyllabus, 
  fetchAllSubjects
} from "@/features/subjects/subjectThunks";

export const useSubjects = () => {
  const dispatch = useAppDispatch();
  const { list, loading, error } = useAppSelector((state) => state.subjects);
  
  return {
    subjects: list,
    loading,
    error,
    fetchSubjects: (batchId: string) => dispatch(fetchSubjects(batchId)),
    fetchAllSubjects: () => dispatch(fetchAllSubjects()),
    createSubject: (data: any) => dispatch(createSubject(data)),
    updateSubject: (subjectId: string, data: any) => dispatch(updateSubject({ subjectId, data })),
    deleteSubject: (subjectId: string) => dispatch(deleteSubject(subjectId)),
    updateSyllabus: (subjectId: string, syllabus: any) => dispatch(updateSyllabus({ subjectId, syllabus })),
  };
};