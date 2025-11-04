// hooks/useStudents.ts
import { clearFilters, setFilters } from '@/features/students/studentSlice';
import { fetchStudents } from '@/features/students/studentThunks';
import { useAppSelector, useAppDispatch } from '@/store/hooks'


function useStudents() {
    const dispatch = useAppDispatch();
    const { students, error, loading, pagination, filters } = useAppSelector((state) => state.students);
    
    const refetch = (newFilters?: any) => {
        dispatch(fetchStudents(newFilters || filters));
    };

    const updateFilters = (newFilters: any) => {
        dispatch(setFilters(newFilters));
    };

    const resetFilters = () => {
        dispatch(clearFilters());
    };
    
    return {
        students,
        error,
        loading,
        pagination,
        filters,
        refetch,
        updateFilters,
        resetFilters
    }
}

export default useStudents