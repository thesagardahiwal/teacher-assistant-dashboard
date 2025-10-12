import { ITeachingDiary } from '@/types/teachingDiary.types';
import { Calendar, Users, BookOpen, FileText, Edit, Trash2 } from 'lucide-react';


interface ViewDiaryModalProps {
  entry: ITeachingDiary;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function ViewDiaryModal({ entry, onClose, onEdit, onDelete }: ViewDiaryModalProps) {
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
          <h2 className="text-xl font-semibold text-gray-900">Diary Entry</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={onEdit}
              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition"
              title="Edit Entry"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
              title="Delete Entry"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Lecture Date</p>
                <p className="text-gray-900 font-medium">{formatDate(entry.lectureDate)}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Batch</p>
                <p className="text-gray-900 font-medium">{entry.batch}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <BookOpen className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Subject</p>
                <p className="text-gray-900 font-medium">{entry.subject}</p>
              </div>
            </div>
          </div>

          {/* Topics Covered */}
          {entry.topicsCovered.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Topics Covered</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {entry.topicsCovered.map((topic: any, index: number) => (
                  <div
                    key={index}
                    className="bg-blue-50 border border-blue-200 rounded-lg p-3"
                  >
                    <p className="text-sm font-medium text-blue-900">{topic.title}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {entry.notes && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Additional Notes</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-wrap">{entry.notes}</p>
              </div>
            </div>
          )}

          {/* Proofs */}
          {entry.proofs && entry.proofs.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Teaching Proofs ({entry.proofs.length})
              </h3>
              <div className="space-y-2">
                {entry.proofs.map((proof: any, index: number) => (
                  <div key={index} className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <a
                      href={proof}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 text-sm truncate flex-1"
                    >
                      {proof}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Created Date */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Created on {new Date(entry.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}