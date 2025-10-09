import { Teacher } from "@/services/teacherService";

export interface AuthState {
    user: Teacher | null
    loading: boolean,
    error: string | null,
}