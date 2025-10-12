import { ITeacher } from '@/types/teacher.types';
import { Camera, Edit3 } from 'lucide-react';


interface ProfileHeaderProps {
  user: ITeacher;
  onEdit: () => void;
}

export function ProfileHeader({ user, onEdit }: ProfileHeaderProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          {/* Profile Picture */}
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
              {user.profilePic ? (
                <img
                  src={user.profilePic}
                  alt={user.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                user.name?.charAt(0).toUpperCase()
              )}
            </div>
            <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full shadow-lg hover:bg-blue-700 transition">
              <Camera className="w-4 h-4" />
            </button>
          </div>

          {/* User Info */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-600">{user.designation || 'Teacher'}</p>
            <p className="text-gray-500 text-sm">{user.department}</p>
            <div className="flex items-center mt-2 space-x-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                user.role === 'Admin' 
                  ? 'bg-purple-100 text-purple-800'
                  : user.role === 'Principal'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {user.role}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                ID: {user.teacherId}
              </span>
            </div>
          </div>
        </div>

        {/* Edit Button */}
        <button
          onClick={onEdit}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Edit3 className="w-4 h-4" />
          <span>Edit Profile</span>
        </button>
      </div>
    </div>
  );
}