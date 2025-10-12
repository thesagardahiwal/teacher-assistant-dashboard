import { ITeacher } from '@/types/teacher.types';
import { Mail, Phone, Calendar, BookOpen, Users } from 'lucide-react';


interface ProfileInfoProps {
  user: ITeacher;
}

export function ProfileInfo({ user }: ProfileInfoProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-700">Contact</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-900">{user.email}</p>
              </div>
            </div>
            
            {user.phone && (
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-900">{user.phone}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Professional Information */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-700">Professional</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Department</p>
                <p className="text-gray-900">{user.department}</p>
              </div>
            </div>
            
            {user.designation && (
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Designation</p>
                  <p className="text-gray-900">{user.designation}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Subjects */}
        {user.subjects?.length > 0 && (
          <div className="md:col-span-2 space-y-3">
            <h3 className="font-medium text-gray-700">Subjects</h3>
            <div className="flex flex-wrap gap-2">
              {user.subjects.map((subject, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700"
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Batches */}
        {user.batches?.length > 0 && (
          <div className="md:col-span-2 space-y-3">
            <h3 className="font-medium text-gray-700">Batches</h3>
            <div className="flex flex-wrap gap-2">
              {user.batches.map((batch, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-50 text-green-700"
                >
                  {batch}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Account Information */}
        <div className="md:col-span-2 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>Member since {formatDate(user.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}