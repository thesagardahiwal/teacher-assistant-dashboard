'use client';
import { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export function DataReview({ data, onSubmit }: {
  data: any[];
  onSubmit: (data: any[]) => void;
}) {
  const [validationErrors, setValidationErrors] = useState<Record<number, string[]>>({});

  const validateData = () => {
    const errors: Record<number, string[]> = {};
    
    data.forEach((row, index) => {
      const rowErrors: string[] = [];
      
      if (!row.name || row.name.trim() === '') {
        rowErrors.push('Name is required');
      }
      
      if (!row.rollNumber || row.rollNumber.trim() === '') {
        rowErrors.push('Roll number is required');
      }
      
      if (rowErrors.length > 0) {
        errors[index] = rowErrors;
      }
    });
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateData()) {
      onSubmit(data);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg">Review Import Data</h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {Object.keys(data[0] || {}).map(field => (
                <th key={field} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  {field}
                </th>
              ))}
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.slice(0, 10).map((row, i) => (
              <tr key={i} className={validationErrors[i] ? 'bg-red-50' : ''}>
                {Object.values(row).map((value: any, j) => (
                  <td key={j} className="px-4 py-2 text-sm">
                    {value || '-'}
                  </td>
                ))}
                <td className="px-4 py-2 text-sm">
                  {validationErrors[i] ? (
                    <div className="flex items-center text-red-600">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {validationErrors[i].join(', ')}
                    </div>
                  ) : (
                    <div className="flex items-center text-green-600">
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      Valid
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center pt-4">
        <div className="text-sm text-gray-500">
          Showing {Math.min(10, data.length)} of {data.length} records
        </div>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Confirm Import
        </button>
      </div>
    </div>
  );
}