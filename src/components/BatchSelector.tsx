import { IBatch } from "@/types/batch.types";
import { ChevronDown, Users } from "lucide-react";

import { useState } from "react";

interface BatchSelectorProps {
  batches: IBatch[];
  selectedBatch: IBatch | null;
  onBatchChange: (batch: IBatch) => void;
}

export function BatchSelector({ batches, selectedBatch, onBatchChange }: BatchSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getYearColor = (year: string) => {
    const colors = {
      'FE': 'bg-green-100 text-green-800',
      'SE': 'bg-blue-100 text-blue-800',
      'TE': 'bg-purple-100 text-purple-800',
      'BE': 'bg-orange-100 text-orange-800',
    };
    return colors[year as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium text-gray-900">Selected Batch</h3>
          <p className="text-sm text-gray-500">Choose a batch to manage subjects</p>
        </div>
        
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-3 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition min-w-64 justify-between"
          >
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-gray-400" />
              <div className="text-left">
                <div className="font-medium text-gray-900">
                  {selectedBatch ? selectedBatch.name : "Select Batch"}
                </div>
                {selectedBatch && (
                  <div className="text-sm text-gray-500">
                    {selectedBatch.department}
                  </div>
                )}
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-80 overflow-y-auto">
              <div className="p-2">
                {batches.map((batch) => (
                  <button
                    key={batch.batchId}
                    onClick={() => {
                      onBatchChange(batch);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left p-3 rounded-lg transition ${
                      selectedBatch?.batchId === batch.batchId
                        ? 'bg-blue-50 border border-blue-200'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium text-gray-900">{batch.name}</div>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getYearColor(batch.year)}`}>
                        {batch.year}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mb-2">{batch.department}</div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{batch.students.length} students</span>
                      <span>{batch.subjects.length} subjects</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}