import { logout as _logout, entry as _entry } from '@/features/auth/authSlice';
import { loginTeacher, registerTeacher } from '@/features/auth/authThunks';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '@/store/store';
import { Teacher } from '@/services/teacherService';

function useAuth() {
    const { user, loading, error } = useSelector((state: RootState) => state.auth);
    const dispath = useDispatch<AppDispatch>();

    const login = (data : {email: string, password: string}) => {
        dispath(loginTeacher(data));
    };

    const entry = (user: Teacher) => {
        dispath(_entry(user));
    }

    const register = (data : any) => {
        dispath(registerTeacher(data));
    };

    const logout = () => {
        dispath(_logout());
    };

    return {
        user,
        loading,
        error,
        logout,
        login,
        register,
        entry
    }
}

export default useAuth