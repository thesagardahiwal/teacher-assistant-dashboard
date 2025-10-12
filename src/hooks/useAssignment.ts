import { createAssignment, evaluateAssignment, fetchAssignments } from '@/features/assignments/assignmentThunks';
import { Assignment } from '@/services/assignmentService';
import { useAppDispatch, useAppSelector } from '@/store/hooks'


function useAssignment() {
    const dispatch = useAppDispatch();
    const { assignments, loading, error } = useAppSelector(state => state.assignments);
    
    return {
        assignments,
        loading,
        error,
        createAssignment: (data: Partial<Assignment>) => dispatch(createAssignment(data)),
        fetchAssignments: () => dispatch(fetchAssignments()),
        evaluateAssignment: (data: any) => dispatch(evaluateAssignment(data)),
        deleteAssignment: (data: any) => {}
    }
}

export default useAssignment