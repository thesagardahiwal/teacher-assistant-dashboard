import { AlertTriangle, BookOpen, FileText, Users } from 'lucide-react';
import { useSubjects } from '@/hooks/useSubjects';
import { ISubject } from '@/types/subject.types';

interface DeleteSubjectModalProps {
  subject: ISubject;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function DeleteSubjectModal({ subject, isOpen, onClose, onSuccess }: DeleteSubjectModalProps) {
  const { deleteSubject, loading } = useSubjects();

  if (!isOpen) return null;

  const handleDelete = async () => {
    try {
      await deleteSubject(subject._id);
      onSuccess();
    } catch (error) {
      console.error('Failed to delete subject:', error);
    }
  };

  const getCompletionPercentage = (syllabus: any[]) => {
    if (!syllabus.length) return 0;
    const totalTopics = syllabus.reduce((acc, module) => acc + module.topics.length, 0);
    const completedTopics = syllabus.reduce((acc, module) => acc + module.completedTopics.length, 0);
    return Math.round((completedTopics / totalTopics) * 100);
  };

  const completion = getCompletionPercentage(subject.syllabus);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Delete Subject</h3>
              <p className="text-gray-600 mt-1">
                Are you sure you want to delete this subject? This action cannot be undone.
              </p>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <BookOpen className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-red-800">{subject.name}</p>
                <p className="text-sm text-red-600">{subject.code} • {subject.department}</p>
                <div className="flex items-center space-x-4 mt-2 text-xs text-red-600">
                  <div className="flex items-center space-x-1">
                    <FileText className="w-3 h-3" />
                    <span>Year {subject.year} - Sem {subject.semester}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{completion}% completed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 text-sm text-red-800 bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="font-medium">This will permanently delete:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Subject information and details</li>
              <li>All syllabus modules and topics</li>
              <li>Teaching proofs and attachments</li>
              <li>Subject progress tracking data</li>
              {subject.assignments?.length > 0 && (
                <li className="font-semibold">
                  {subject.assignments.length} associated assignments
                </li>
              )}
            </ul>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
            >
              {loading ? 'Deleting...' : 'Delete Subject'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}