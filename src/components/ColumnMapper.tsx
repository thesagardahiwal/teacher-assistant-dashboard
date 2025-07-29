'use client';
import { useState, useEffect } from 'react';

export function ColumnMapper({ 
  rawData, 
  onMappingComplete 
}: { 
  rawData: any[]; 
  onMappingComplete: (mappedData: any[]) => void 
}) {
  const [columnMapping, setColumnMapping] = useState<Record<string, string>>({});
  const [availableColumns, setAvailableColumns] = useState<string[]>([]);

  useEffect(() => {
    if (rawData.length > 0) {
      const columns = Object.keys(rawData[0]);
      setAvailableColumns(columns);
      
      // Set default mappings
      const defaultMappings: Record<string, string> = {};
      columns.forEach(col => {
        if (col.toLowerCase().includes('name')) defaultMappings['name'] = col;
        if (col.toLowerCase().includes('roll')) defaultMappings['rollNumber'] = col;
        if (col.toLowerCase().includes('email')) defaultMappings['email'] = col;
      });
      setColumnMapping(defaultMappings);
    }
  }, [rawData]);

  const handleMappingChange = (targetField: string, sourceField: string) => {
    setColumnMapping(prev => ({
      ...prev,
      [targetField]: sourceField
    }));
  };

  const applyMapping = () => {
    const mappedData = rawData.map(record => {
      const mappedRecord: any = {};
      Object.entries(columnMapping).forEach(([targetField, sourceField]) => {
        mappedRecord[targetField] = record[sourceField];
      });
      return mappedRecord;
    });
    onMappingComplete(mappedData);
  };

  return (
    <div className="space-y-6">
      <h3 className="font-medium text-lg">Map Columns</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Required Fields */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-gray-700">Student Fields</h4>
          <FieldMapper 
            label="Full Name"
            value={columnMapping['name'] || ''}
            options={availableColumns}
            onChange={(value) => handleMappingChange('name', value)}
          />
          <FieldMapper 
            label="Roll Number"
            value={columnMapping['rollNumber'] || ''}
            options={availableColumns}
            onChange={(value) => handleMappingChange('rollNumber', value)}
          />
        </div>

        {/* Optional Fields */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-gray-700">Additional Fields</h4>
          <FieldMapper 
            label="Email"
            value={columnMapping['email'] || ''}
            options={availableColumns}
            onChange={(value) => handleMappingChange('email', value)}
          />
          <FieldMapper 
            label="Class"
            value={columnMapping['class'] || ''}
            options={availableColumns}
            onChange={(value) => handleMappingChange('class', value)}
          />
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={applyMapping}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Apply Mapping
        </button>
      </div>

      {/* Data Preview */}
      {columnMapping.name && (
        <div className="mt-6">
          <h4 className="font-medium mb-2">Preview</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {Object.keys(columnMapping).map(field => (
                    <th key={field} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      {field}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rawData.slice(0, 5).map((row, i) => (
                  <tr key={i}>
                    {Object.values(columnMapping).map((col, j) => (
                      <td key={j} className="px-4 py-2 text-sm text-gray-900">
                        {row[col] || '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function FieldMapper({ label, value, options, onChange }: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <label className="text-sm text-gray-700">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="ml-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
      >
        <option value="">Not mapped</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}