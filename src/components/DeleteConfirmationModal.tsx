import { AlertTriangle } from 'lucide-react';
import useDiary from '@/hooks/useDiary';
import { ITeachingDiary } from '@/types/teachingDiary.types';


interface DeleteConfirmationModalProps {
  entry: ITeachingDiary | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function DeleteConfirmationModal({ 
  entry, 
  isOpen, 
  onClose, 
  onSuccess 
}: DeleteConfirmationModalProps) {
  const { deleteDiaryEntry, loading } = useDiary();

  if (!isOpen || !entry) return null;

  const handleDelete = async () => {
    try {
      await deleteDiaryEntry(entry._id);
      onSuccess();
    } catch (error) {
      console.error('Failed to delete entry:', error);
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
              <h3 className="text-lg font-semibold text-gray-900">Delete Entry</h3>
              <p className="text-gray-600 mt-1">
                Are you sure you want to delete this diary entry? This action cannot be undone.
              </p>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-red-800">
              <strong>Subject:</strong> {entry.subject} - {entry.batch}
            </p>
            <p className="text-sm text-red-800 mt-1">
              <strong>Date:</strong> {new Date(entry.lectureDate).toLocaleDateString()}
            </p>
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
              {loading ? 'Deleting...' : 'Delete Entry'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}