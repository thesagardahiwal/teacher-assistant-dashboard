import { Users, Plus } from 'lucide-react';

interface EmptyStateProps {
  onCreateBatch: () => void;
}

export function EmptyState({ onCreateBatch }: EmptyStateProps) {
  return (
    <div className="text-center py-16">
      <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
        <Users className="w-12 h-12 text-blue-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">No batches yet</h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Start organizing your students by creating batches. Batches help you manage classes, assign teachers, and track academic progress efficiently.
      </p>
      <button
        onClick={onCreateBatch}
        className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition shadow-lg"
      >
        <Plus className="w-5 h-5" />
        <span>Create Your First Batch</span>
      </button>
    </div>
  );
}