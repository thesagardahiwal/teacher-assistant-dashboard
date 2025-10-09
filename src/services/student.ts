import { IStudent } from '../types/student.types';

interface IImportStudentResponse {
  importedCount: number;
  duplicates: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL+'/api/students'; // Using Next.js API routes proxy

class StudentService {
  private static async fetchHandler(url: string, options: RequestInit = {}) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        credentials: 'include', // Include cookies for authentication
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'API request failed');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message || 'An error occurred');
      }
      throw new Error('An unexpected error occurred');
    }
  }

  // Create a new student
  static async createStudent(studentData: Omit<IStudent, '_id' | 'createdAt' | 'updatedAt'>) {
    return this.fetchHandler(API_BASE_URL, {
      method: 'POST',
      body: JSON.stringify(studentData),
    });
  }

  // Get all students
  static async getAllStudents() {
    return this.fetchHandler(API_BASE_URL);
  }

  // Get a single student by ID
  static async getStudentById(id: string) {
    return this.fetchHandler(`${API_BASE_URL}/${id}`);
  }

  // Update a student
  static async updateStudent(id: string, studentData: Partial<IStudent>) {
    return this.fetchHandler(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(studentData),
    });
  }

  // Delete a student
  static async deleteStudent(id: string) {
    return this.fetchHandler(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
  }

  // Import multiple students
  static async importStudents(students: Array<Omit<IStudent, '_id' | 'createdAt' | 'updatedAt'>>): Promise<IImportStudentResponse> {
    return this.fetchHandler(`${API_BASE_URL}/import`, {
      method: 'POST',
      body: JSON.stringify({ students }),
    });
  }

  // Add classroom to student
  static async addClassroomToStudent(studentId: string, classroomId: string) {
    return this.fetchHandler(`${API_BASE_URL}/${studentId}/classrooms`, {
      method: 'POST',
      body: JSON.stringify({ classroomId }),
    });
  }

  // Remove classroom from student
  static async removeClassroomFromStudent(studentId: string, classroomId: string) {
    return this.fetchHandler(`${API_BASE_URL}/${studentId}/classrooms`, {
      method: 'DELETE',
      body: JSON.stringify({ classroomId }),
    });
  }

  // Get students by classroom ID
  static async getStudentsByClassroom(classroomId: string) {
    return this.fetchHandler(`${API_BASE_URL}/by-classroom/${classroomId}`);
  }
}

export default StudentService;