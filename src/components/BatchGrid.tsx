import { IBatch } from '@/types/batch.types';
import { Users, BookOpen, UserCheck, Calendar, MoreVertical, Eye, Edit, Trash2 } from 'lucide-react';

import { useState } from 'react';

interface BatchGridProps {
  batches: IBatch[];
  onViewBatch: (batch: IBatch) => void;
  onEditBatch: (batch: IBatch) => void;
  onDeleteBatch: (batch: IBatch) => void;
}

export function BatchGrid({ batches, onViewBatch, onEditBatch, onDeleteBatch }: BatchGridProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const getYearColor = (year: string) => {
    const colors = {
      'FE': 'bg-green-100 text-green-800 border-green-200',
      'SE': 'bg-blue-100 text-blue-800 border-blue-200',
      'TE': 'bg-purple-100 text-purple-800 border-purple-200',
      'BE': 'bg-orange-100 text-orange-800 border-orange-200',
    };
    return colors[year as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {batches.map((batch) => (
        <div
          key={batch.batchId}
          className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{batch.name}</h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getYearColor(batch.year)}`}>
                  {batch.year} Year
                </span>
              </div>
              
              {/* Dropdown Menu */}
              <div className="relative">
                <button
                  onClick={() => setActiveMenu(activeMenu === batch.batchId ? null : batch.batchId)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition"
                >
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </button>
                
                {activeMenu === batch.batchId && (
                  <div className="absolute right-0 top-8 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    <button
                      onClick={() => {
                        onViewBatch(batch);
                        setActiveMenu(null);
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                    <button
                      onClick={() => {
                        onEditBatch(batch);
                        setActiveMenu(null);
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit Batch</span>
                    </button>
                    <button
                      onClick={() => {
                        onDeleteBatch(batch);
                        setActiveMenu(null);
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete Batch</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <p className="text-gray-600 text-sm">{batch.department}</p>
          </div>

          {/* Stats */}
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <Users className="w-4 h-4" />
                <span>Students</span>
              </div>
              <span className="font-semibold text-gray-900">{batch.students.length}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <UserCheck className="w-4 h-4" />
                <span>Teachers</span>
              </div>
              <span className="font-semibold text-gray-900">{batch.teachers.length}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <BookOpen className="w-4 h-4" />
                <span>Subjects</span>
              </div>
              <span className="font-semibold text-gray-900">{batch.subjects.length}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 rounded-b-xl">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>Created {formatDate(batch.createdAt)}</span>
              </div>
              <button
                onClick={() => onViewBatch(batch)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}