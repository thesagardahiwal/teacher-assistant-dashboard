import { useState, useEffect } from 'react';
import { X, Plus, Trash2, Upload } from 'lucide-react';
import useDiary from '@/hooks/useDiary';
import { ITeachingDiary } from '@/types/teachingDiary.types';


interface EditDiaryModalProps {
  entry: ITeachingDiary;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface Topic {
  moduleId: string;
  topicId: string;
  title: string;
}

export function EditDiaryModal({ entry, isOpen, onClose, onSuccess }: EditDiaryModalProps) {
  const { updateDiaryEntry, loading } = useDiary();
  const [formData, setFormData] = useState({
    batch: '',
    subject: '',
    lectureDate: '',
    notes: '',
  });
  const [topics, setTopics] = useState<Topic[]>([]);
  const [proofs, setProofs] = useState<string[]>([]);
  const [newTopic, setNewTopic] = useState('');

  useEffect(() => {
    if (entry) {
      setFormData({
        batch: entry.batch,
        subject: entry.subject,
        lectureDate: new Date(entry.lectureDate).toISOString().split('T')[0],
        notes: entry.notes || '',
      });
      setTopics(entry.topicsCovered);
      setProofs(entry.proofs || []);
    }
  }, [entry]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedEntry: ITeachingDiary = {
      ...entry,
      batch: formData.batch,
      subject: formData.subject,
      lectureDate: new Date(formData.lectureDate),
      topicsCovered: topics,
      notes: formData.notes || undefined,
      proofs: proofs.length > 0 ? proofs : undefined,
    };

    try {
      await updateDiaryEntry(updatedEntry);
      onSuccess();
    } catch (error) {
      console.error('Failed to update entry:', error);
    }
  };

  const addTopic = () => {
    if (newTopic.trim()) {
      const topic: Topic = {
        moduleId: `module-${Date.now()}`,
        topicId: `topic-${Date.now()}`,
        title: newTopic.trim(),
      };
      setTopics([...topics, topic]);
      setNewTopic('');
    }
  };

  const removeTopic = (index: number) => {
    setTopics(topics.filter((_, i) => i !== index));
  };

  const addProof = () => {
    const proofUrl = prompt('Enter proof URL (PPT, notes, video link):');
    if (proofUrl) {
      setProofs([...proofs, proofUrl]);
    }
  };

  const removeProof = (index: number) => {
    setProofs(proofs.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Edit Diary Entry</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form - Similar to CreateDiaryModal but with update logic */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Form fields are the same as CreateDiaryModal */}
          {/* ... (same form structure as CreateDiaryModal) ... */}

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
              {loading ? 'Updating...' : 'Update Entry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}