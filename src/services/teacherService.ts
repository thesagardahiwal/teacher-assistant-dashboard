import { fetchHandler } from "@/lib/apiClient";
import { ITeacher } from "@/types/teacher.types";
import { int } from "zod";

export interface Teacher {
   id: string; 
   name: string; 
   email: string; 
   role: string; 
   department: string 
};

export interface RegisterResponse {
    msg: string;
    teacher: ITeacher
}

export interface LoginResponse {
    msg: string; 
    teacher: ITeacher
};

export interface VarifyResponse {
    teacher: ITeacher;
    msg: string;
}

export interface UpdateResponse extends VarifyResponse {}

export const teacherService = {
  register: (data: Partial<Teacher>) => fetchHandler.post<RegisterResponse>("/teachers/register", data),
  login: (data: { email: string; password: string }) => fetchHandler.post<LoginResponse>("/teachers/login", data),
  varify: () => fetchHandler.get<VarifyResponse>("/teachers"),
  update: (data: Partial<Teacher>) => fetchHandler.put<UpdateResponse>("/teachers/update", data),
};
