import { addDiaryEntry, fetchDiaryEntries } from '@/features/diary/diaryThunks';
import { TeachingDiary } from '@/services/teachingDiaryService';
import { AppDispatch, RootState } from '@/store/store'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'

function useDiary() {
    const {entries, error, loading} = useSelector((state: RootState) => state.diary);
    const dispatch = useDispatch<AppDispatch>();

    const createDiaryEntry = (entry: TeachingDiary) => {
        dispatch(addDiaryEntry(entry));
    };

    const getDiaryEntries = (teacherId: string) => {
        dispatch(fetchDiaryEntries(teacherId));
    };

    const updateDiaryEntry = (data: any) => {}
    const deleteDiaryEntry = (data: any) => {}

    return {
        entries, 
        error, 
        loading,
        createDiaryEntry,
        getDiaryEntries,
        updateDiaryEntry,
        deleteDiaryEntry
    }
}

export default useDiary