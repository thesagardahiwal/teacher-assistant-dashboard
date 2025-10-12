import { Calendar, List, Plus } from 'lucide-react';

interface DiaryHeaderProps {
  viewMode: 'list' | 'calendar';
  onViewModeChange: (mode: 'list' | 'calendar') => void;
  onCreateEntry: () => void;
  entryCount: number;
}

export function DiaryHeader({ 
  viewMode, 
  onViewModeChange, 
  onCreateEntry, 
  entryCount 
}: DiaryHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Teaching Diary</h1>
        <p className="text-gray-600">
          {entryCount} {entryCount === 1 ? 'entry' : 'entries'} documented
        </p>
      </div>

      <div className="flex items-center space-x-3">
        {/* View Mode Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1">
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
          <button
            onClick={() => onViewModeChange('calendar')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md transition ${
              viewMode === 'calendar' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Calendar</span>
          </button>
        </div>

        {/* Create Button */}
        <button
          onClick={onCreateEntry}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="w-4 h-4" />
          <span>New Entry</span>
        </button>
      </div>
    </div>
  );
}