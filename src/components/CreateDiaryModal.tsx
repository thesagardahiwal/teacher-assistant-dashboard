import { useState } from 'react';
import { X, Plus, Trash2, Upload } from 'lucide-react';
import useDiary from '@/hooks/useDiary';
import useAuth from '@/hooks/useAuth';
import { ITeachingDiary } from '@/types/teachingDiary.types';


interface CreateDiaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface Topic {
  moduleId: string;
  topicId: string;
  title: string;
}

export function CreateDiaryModal({ isOpen, onClose, onSuccess }: CreateDiaryModalProps) {
  const { user } = useAuth();
  const { createDiaryEntry, loading } = useDiary();
  const [formData, setFormData] = useState({
    batch: '',
    subject: '',
    lectureDate: new Date().toISOString().split('T')[0],
    notes: '',
  });
  const [topics, setTopics] = useState<Topic[]>([]);
  const [proofs, setProofs] = useState<string[]>([]);
  const [newTopic, setNewTopic] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.teacherId) return;

    const entry = {
      teacher: user.teacherId,
      batch: formData.batch,
      subject: formData.subject,
      lectureDate: new Date(formData.lectureDate),
      topicsCovered: topics,
      notes: formData.notes || undefined,
      proofs: proofs.length > 0 ? proofs : undefined,
    };

    try {
      await createDiaryEntry(entry as ITeachingDiary);
      onSuccess();
      resetForm();
    } catch (error) {
      console.error('Failed to create entry:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      batch: '',
      subject: '',
      lectureDate: new Date().toISOString().split('T')[0],
      notes: '',
    });
    setTopics([]);
    setProofs([]);
    setNewTopic('');
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
          <h2 className="text-xl font-semibold text-gray-900">Create Diary Entry</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Batch *
              </label>
              <input
                type="text"
                required
                value={formData.batch}
                onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., CS-2024-A"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject *
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Data Structures"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lecture Date *
              </label>
              <input
                type="date"
                required
                value={formData.lectureDate}
                onChange={(e) => setFormData({ ...formData, lectureDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Topics Covered */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Topics Covered
            </label>
            <div className="space-y-2">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTopic())}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter a topic and press Enter"
                />
                <button
                  type="button"
                  onClick={addTopic}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              {topics.length > 0 && (
                <div className="space-y-2">
                  {topics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                      <span className="text-sm">{topic.title}</span>
                      <button
                        type="button"
                        onClick={() => removeTopic(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Proofs */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Teaching Proofs
              </label>
              <button
                type="button"
                onClick={addProof}
                className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700"
              >
                <Upload className="w-4 h-4" />
                <span>Add Proof</span>
              </button>
            </div>
            
            {proofs.length > 0 && (
              <div className="space-y-2">
                {proofs.map((proof, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                    <span className="text-sm truncate">{proof}</span>
                    <button
                      type="button"
                      onClick={() => removeProof(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Any additional notes about this session..."
            />
          </div>

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
              {loading ? 'Creating...' : 'Create Entry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}