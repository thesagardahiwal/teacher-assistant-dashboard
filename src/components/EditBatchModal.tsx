import { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { useBatches } from '@/hooks/useBatches';
import { IBatch } from '@/types/batch.types';


interface EditBatchModalProps {
  batch: IBatch;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function EditBatchModal({ batch, isOpen, onClose, onSuccess }: EditBatchModalProps) {
  const { updateBatch, loading } = useBatches();
  const [formData, setFormData] = useState({
    name: '',
    year: 'FE',
    department: '',
  });
  const [students, setStudents] = useState<string[]>([]);
  const [teachers, setTeachers] = useState<string[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [newStudent, setNewStudent] = useState('');
  const [newTeacher, setNewTeacher] = useState('');
  const [newSubject, setNewSubject] = useState('');

  useEffect(() => {
    if (batch) {
      setFormData({
        name: batch.name,
        year: batch.year,
        department: batch.department,
      });
      setStudents(batch.students);
      setTeachers(batch.teachers);
      setSubjects(batch.subjects);
    }
  }, [batch]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedBatch = {
      ...batch,
      ...formData,
      students,
      teachers,
      subjects,
    };

    try {
      await updateBatch(batch.batchId, updatedBatch);
      onSuccess();
    } catch (error) {
      console.error('Failed to update batch:', error);
    }
  };

  // ... (rest of the functions are similar to CreateBatchModal)
  // Add/remove functions for students, teachers, subjects

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Edit Batch</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form - Similar structure to CreateBatchModal */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Form fields identical to CreateBatchModal */}
          
          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Batch'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}