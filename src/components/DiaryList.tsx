import { ITeachingDiary } from '@/types/teachingDiary.types';
import { Eye, Edit, Trash2, FileText } from 'lucide-react';


interface DiaryListProps {
  entries: ITeachingDiary[];
  onViewEntry: (entry: ITeachingDiary) => void;
  onEditEntry: (entry: ITeachingDiary) => void;
  onDeleteEntry: (entry: ITeachingDiary) => void;
}

export function DiaryList({ entries, onViewEntry, onEditEntry, onDeleteEntry }: DiaryListProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      {entries.map((entry, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition"
        >
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
            {/* Entry Content */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {entry.subject} - {entry.batch}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {formatDate(entry.lectureDate)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {entry.proofs && entry.proofs.length > 0 && (
                    <div className="flex items-center text-gray-400 text-sm">
                      <FileText className="w-4 h-4 mr-1" />
                      {entry.proofs.length}
                    </div>
                  )}
                </div>
              </div>

              {/* Topics Covered */}
              {entry.topicsCovered.length > 0 && (
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Topics Covered:</h4>
                  <div className="flex flex-wrap gap-2">
                    {entry.topicsCovered.map((topic, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {topic.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes Preview */}
              {entry.notes && (
                <p className="text-gray-600 text-sm line-clamp-2">
                  {entry.notes}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2 lg:flex-col lg:space-x-0 lg:space-y-2">
              <button
                onClick={() => onViewEntry(entry)}
                className="flex items-center space-x-1 p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                title="View Entry"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={() => onEditEntry(entry)}
                className="flex items-center space-x-1 p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition"
                title="Edit Entry"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDeleteEntry(entry)}
                className="flex items-center space-x-1 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                title="Delete Entry"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}