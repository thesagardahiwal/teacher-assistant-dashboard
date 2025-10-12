import { ITeacher } from "@/types/teacher.types";

export interface AuthState {
    user: ITeacher | null
    loading: boolean,
    error: string | null,
}