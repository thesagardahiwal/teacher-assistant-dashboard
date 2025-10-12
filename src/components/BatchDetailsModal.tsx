import { IBatch } from '@/types/batch.types';
import { Users, BookOpen, UserCheck, Calendar, Edit, Trash2 } from 'lucide-react';


interface BatchDetailsModalProps {
  batch: IBatch;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function BatchDetailsModal({ batch, isOpen, onClose, onEdit, onDelete }: BatchDetailsModalProps) {
  if (!isOpen) return null;

  const getYearColor = (year: string) => {
    const colors = {
      'FE': 'bg-green-100 text-green-800 border-green-200',
      'SE': 'bg-blue-100 text-blue-800 border-blue-200',
      'TE': 'bg-purple-100 text-purple-800 border-purple-200',
      'BE': 'bg-orange-100 text-orange-800 border-orange-200',
    };
    return colors[year as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{batch.name}</h2>
              <p className="text-gray-600">{batch.department}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onEdit}
              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition"
              title="Edit Batch"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
              title="Delete Batch"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <span className="w-5 h-5">×</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <Users className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{batch.students.length}</p>
                <p className="text-sm text-gray-600">Students</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <UserCheck className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{batch.teachers.length}</p>
                <p className="text-sm text-gray-600">Teachers</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <BookOpen className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{batch.subjects.length}</p>
                <p className="text-sm text-gray-600">Subjects</p>
              </div>
            </div>
          </div>

          {/* Year Badge */}
          <div className="flex justify-center">
            <span className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-medium border-2 ${getYearColor(batch.year)}`}>
              {batch.year} Year
            </span>
          </div>

          {/* Students List */}
          {batch.students.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Students ({batch.students.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {batch.students.map((student, index) => (
                  <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm font-medium text-blue-900">{student}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Teachers List */}
          {batch.teachers.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Teachers ({batch.teachers.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {batch.teachers.map((teacher, index) => (
                  <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-sm font-medium text-green-900">{teacher}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Subjects List */}
          {batch.subjects.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Subjects ({batch.subjects.length})</h3>
              <div className="flex flex-wrap gap-2">
                {batch.subjects.map((subject, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-50 text-purple-700 border border-purple-200"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Timestamps */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Created {formatDate(batch.createdAt)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Updated {formatDate(batch.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}