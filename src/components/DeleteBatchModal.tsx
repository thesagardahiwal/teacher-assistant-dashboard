import { AlertTriangle, Users } from 'lucide-react';
import { useBatches } from '@/hooks/useBatches';
import { IBatch } from '@/types/batch.types';


interface DeleteBatchModalProps {
  batch: IBatch;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function DeleteBatchModal({ batch, isOpen, onClose, onSuccess }: DeleteBatchModalProps) {
  const { deleteBatch, loading } = useBatches();

  if (!isOpen) return null;

  const handleDelete = async () => {
    try {
      await deleteBatch(batch.batchId);
      onSuccess();
    } catch (error) {
      console.error('Failed to delete batch:', error);
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
              <h3 className="text-lg font-semibold text-gray-900">Delete Batch</h3>
              <p className="text-gray-600 mt-1">
                Are you sure you want to delete this batch? This action cannot be undone.
              </p>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Users className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="font-medium text-red-800">{batch.name}</p>
                <p className="text-sm text-red-600">{batch.department} • {batch.year} Year</p>
                <div className="flex space-x-4 mt-1 text-xs text-red-600">
                  <span>{batch.students.length} students</span>
                  <span>{batch.teachers.length} teachers</span>
                  <span>{batch.subjects.length} subjects</span>
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
              {loading ? 'Deleting...' : 'Delete Batch'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}