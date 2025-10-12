import { Grid, List, Plus, Users } from 'lucide-react';

interface BatchHeaderProps {
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onCreateBatch: () => void;
  batchCount: number;
}

export function BatchHeader({ 
  viewMode, 
  onViewModeChange, 
  onCreateBatch, 
  batchCount 
}: BatchHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Batches</h1>
            <p className="text-gray-600">
              {batchCount} {batchCount === 1 ? 'batch' : 'batches'} managed
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {/* View Mode Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md transition ${
              viewMode === 'grid' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Grid className="w-4 h-4" />
            <span>Grid</span>
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md transition ${
              viewMode === 'list' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <List className="w-4 h-4" />
            <span>List</span>
          </button>
        </div>

        {/* Create Button */}
        <button
          onClick={onCreateBatch}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>New Batch</span>
        </button>
      </div>
    </div>
  );
}