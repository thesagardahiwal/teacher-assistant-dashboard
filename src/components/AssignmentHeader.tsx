import { Grid, List, Plus, Filter, FileText } from 'lucide-react';

type ViewMode = 'grid' | 'list';
type FilterType = 'all' | 'pending' | 'submitted' | 'graded';

interface AssignmentHeaderProps {
  viewMode: ViewMode;
  filter: FilterType;
  onViewModeChange: (mode: ViewMode) => void;
  onFilterChange: (filter: FilterType) => void;
  onCreateAssignment: () => void;
  assignmentCount: number;
  filteredCount: number;
}

export function AssignmentHeader({ 
  viewMode, 
  filter,
  onViewModeChange, 
  onFilterChange,
  onCreateAssignment, 
  assignmentCount,
  filteredCount
}: AssignmentHeaderProps) {
  const filterOptions = [
    { value: 'all', label: 'All Assignments', color: 'gray' },
    { value: 'pending', label: 'Pending', color: 'orange' },
    { value: 'submitted', label: 'Submitted', color: 'blue' },
    { value: 'graded', label: 'Graded', color: 'green' },
  ];

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
      <div>
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <FileText className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
            <p className="text-gray-600">
              {filteredCount} of {assignmentCount} assignments
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Filter Options */}
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <div className="flex bg-gray-100 rounded-lg p-1">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onFilterChange(option.value as FilterType)}
                className={`px-3 py-1 text-sm rounded-md transition ${
                  filter === option.value 
                    ? 'bg-white shadow-sm text-gray-900' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

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
          onClick={onCreateAssignment}
          className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>New Assignment</span>
        </button>
      </div>
    </div>
  );
}