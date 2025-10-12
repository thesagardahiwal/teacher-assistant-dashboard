import { IBatch } from '@/types/batch.types';
import { Users, BookOpen, UserCheck, Calendar, Eye, Edit, Trash2 } from 'lucide-react';


interface BatchListProps {
  batches: IBatch[];
  onViewBatch: (batch: IBatch) => void;
  onEditBatch: (batch: IBatch) => void;
  onDeleteBatch: (batch: IBatch) => void;
}

export function BatchList({ batches, onViewBatch, onEditBatch, onDeleteBatch }: BatchListProps) {
  const getYearColor = (year: string) => {
    const colors = {
      'FE': 'bg-green-100 text-green-800',
      'SE': 'bg-blue-100 text-blue-800',
      'TE': 'bg-purple-100 text-purple-800',
      'BE': 'bg-orange-100 text-orange-800',
    };
    return colors[year as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Batch Details
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statistics
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {batches.map((batch) => (
              <tr key={batch.batchId} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{batch.name}</h3>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getYearColor(batch.year)}`}>
                        {batch.year}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{batch.department}</p>
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{batch.students.length}</span>
                      <span className="text-gray-500">students</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <UserCheck className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{batch.teachers.length}</span>
                      <span className="text-gray-500">teachers</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{batch.subjects.length}</span>
                      <span className="text-gray-500">subjects</span>
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(batch.createdAt)}</span>
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => onViewBatch(batch)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEditBatch(batch)}
                      className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition"
                      title="Edit Batch"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteBatch(batch)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete Batch"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}