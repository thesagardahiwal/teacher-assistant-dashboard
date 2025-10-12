import { logout as _logout, entry as _entry } from '@/features/auth/authSlice';
import { loginTeacher, registerTeacher, verifyTeacher } from '@/features/auth/authThunks';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '@/store/store';
import { ITeacher } from '@/types/teacher.types';
import { useEffect } from 'react';

function useAuth() {
    const { user, loading, error } = useSelector((state: RootState) => state.auth);
    const dispath = useDispatch<AppDispatch>();

    const login = (data : {email: string, password: string}) => {
        dispath(loginTeacher(data));
    };

    const entry = (user: ITeacher) => {
        dispath(_entry(user));
    }

    const register = (data : any) => {
        dispath(registerTeacher(data));
    };

    const logout = () => {
        dispath(_logout());
    };

    useEffect(() => {
        if (!user) {
            dispath(verifyTeacher());
        }
    }, [user]);

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