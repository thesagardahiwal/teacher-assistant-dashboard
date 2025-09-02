interface Classroom {
  _id?: string;
  subject: string;
  teacher: string; // Teacher ID
  students?: string[]; // Array of Student IDs
  deleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface AddRemoveStudentPayload {
  studentId: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL+'/classrooms'; // Using Next.js API routes proxy

class ClassroomService {
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

  // Create a new classroom
  static async createClassroom(classroomData: Omit<Classroom, '_id' | 'deleted' | 'createdAt' | 'updatedAt'>) {
    return this.fetchHandler(API_BASE_URL, {
      method: 'POST',
      body: JSON.stringify(classroomData),
    });
  }

  // Get all classrooms (non-deleted)
  static async getAllClassrooms() {
    return this.fetchHandler(API_BASE_URL);
  }

  // Get a single classroom by ID
  static async getClassroomById(id: string) {
    return this.fetchHandler(`${API_BASE_URL}/${id}`);
  }

  // Update a classroom
  static async updateClassroom(id: string, classroomData: Partial<Classroom>) {
    return this.fetchHandler(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(classroomData),
    });
  }

  // Delete a classroom (soft delete)
  static async deleteClassroom(id: string) {
    return this.fetchHandler(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
  }

  // Add student to classroom
  static async addStudentToClassroom(classroomId: string, studentId: string) {
    const payload: AddRemoveStudentPayload = { studentId };
    return this.fetchHandler(`${API_BASE_URL}/${classroomId}/students`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  // Remove student from classroom
  static async removeStudentFromClassroom(classroomId: string, studentId: string) {
    const payload: AddRemoveStudentPayload = { studentId };
    return this.fetchHandler(`${API_BASE_URL}/${classroomId}/students`, {
      method: 'DELETE',
      body: JSON.stringify(payload),
    });
  }
}

export default ClassroomService;