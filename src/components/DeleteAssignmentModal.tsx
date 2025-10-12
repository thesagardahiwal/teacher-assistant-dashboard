import { AlertTriangle, FileText, Download, Users } from 'lucide-react';
import useAssignment from '@/hooks/useAssignment';
import { IAssignment } from '@/types/assessment.types';


interface DeleteAssignmentModalProps {
  assignment: IAssignment;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function DeleteAssignmentModal({ assignment, isOpen, onClose, onSuccess }: DeleteAssignmentModalProps) {
  const { deleteAssignment, loading } = useAssignment();

  if (!isOpen) return null;

  const handleDelete = async () => {
    try {
      await deleteAssignment(assignment._id);
      onSuccess();
    } catch (error) {
      console.error('Failed to delete assignment:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Delete Assignment</h3>
              <p className="text-gray-600 mt-1">
                Are you sure you want to delete this assignment? This action cannot be undone.
              </p>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <FileText className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="font-medium text-red-800">{assignment.title}</p>
                <p className="text-sm text-red-600">{assignment.subject} • {assignment.batch}</p>
                <div className="flex space-x-4 mt-1 text-xs text-red-600">
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{assignment.submissions.length} submissions</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Download className="w-3 h-3" />
                    <span>Max {assignment.maxMarks} marks</span>
                  </div>
                </div>
              </div>
            </div>
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
              {loading ? 'Deleting...' : 'Delete Assignment'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}