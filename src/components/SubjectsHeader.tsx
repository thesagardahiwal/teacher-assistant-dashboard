import { Grid, List, Plus, BookOpen } from 'lucide-react';

interface SubjectsHeaderProps {
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onCreateSubject: () => void;
  subjectCount: number;
  disabled?: boolean;
}

export function SubjectsHeader({ 
  viewMode, 
  onViewModeChange, 
  onCreateSubject, 
  subjectCount,
  disabled = false
}: SubjectsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <BookOpen className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Subjects</h1>
          <p className="text-gray-600">
            {subjectCount} {subjectCount === 1 ? 'subject' : 'subjects'}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {/* View Mode Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md transition ${
              viewMode === 'grid' 
                ? 'bg-white text-indigo-600 shadow-sm' 
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
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <List className="w-4 h-4" />
            <span>List</span>
          </button>
        </div>

        {/* Create Button */}
        <button
          onClick={onCreateSubject}
          disabled={disabled}
          className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>New Subject</span>
        </button>
      </div>
    </div>
  );
}