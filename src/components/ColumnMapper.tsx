'use client';
import { useState, useEffect } from 'react';
import { Plus, Minus, Merge } from 'lucide-react';

type FieldConfig = {
  targetField: string;
  sourceFields: string[];
  mergeDelimiter: string;
  isRequired: boolean;
};

export function ColumnMapper({ 
  rawData, 
  onMappingComplete 
}: { 
  rawData: any[]; 
  onMappingComplete: (mappedData: any[]) => void 
}) {
  const [availableColumns, setAvailableColumns] = useState<string[]>([]);
  const [fieldConfigs, setFieldConfigs] = useState<FieldConfig[]>([
    { targetField: 'Roll Number', sourceFields: [], mergeDelimiter: '', isRequired: true },
    { targetField: 'Name', sourceFields: [], mergeDelimiter: ' ', isRequired: false }
  ]);
  const [customFields, setCustomFields] = useState<FieldConfig[]>([]);

  useEffect(() => {
    if (rawData.length > 0) {
      const columns = Object.keys(rawData[0]);
      setAvailableColumns(columns);
      
      // Set default mappings for recognized fields
      const updatedConfigs = fieldConfigs.map(config => {
        const autoMatch = columns.find(col => 
          col.toLowerCase().includes(config.targetField.toLowerCase())
        );
        return autoMatch ? { ...config, sourceFields: [autoMatch] } : config;
      });
      setFieldConfigs(updatedConfigs);
    }
  }, [rawData]);

  const handleSourceFieldChange = (index: number, fieldIndex: number, value: string) => {
    const updatedConfigs = [...fieldConfigs];
    updatedConfigs[index].sourceFields[fieldIndex] = value;
    setFieldConfigs(updatedConfigs);
  };

  const addSourceField = (index: number) => {
    const updatedConfigs = [...fieldConfigs];
    updatedConfigs[index].sourceFields.push('');
    setFieldConfigs(updatedConfigs);
  };

  const removeSourceField = (index: number, fieldIndex: number) => {
    const updatedConfigs = [...fieldConfigs];
    updatedConfigs[index].sourceFields.splice(fieldIndex, 1);
    setFieldConfigs(updatedConfigs);
  };

  const addCustomField = () => {
    setCustomFields([
      ...customFields,
      { targetField: '', sourceFields: [''], mergeDelimiter: ' ', isRequired: false }
    ]);
  };

  const removeCustomField = (index: number) => {
    const updatedFields = [...customFields];
    updatedFields.splice(index, 1);
    setCustomFields(updatedFields);
  };

  const applyMapping = () => {
    const allConfigs = [...fieldConfigs, ...customFields];
    const mappedData = rawData.map(record => {
      const mappedRecord: any = {};
      
      allConfigs.forEach(config => {
        if (config.sourceFields.length > 0 && config.sourceFields[0]) {
          // Handle merged fields
          if (config.sourceFields.length > 1) {
            mappedRecord[config.targetField] = config.sourceFields
              .map(field => record[field] || '')
              .filter(val => val)
              .join(config.mergeDelimiter);
          } else {
            mappedRecord[config.targetField] = record[config.sourceFields[0]];
          }
        }
      });
      
      return mappedRecord;
    });

    onMappingComplete(mappedData);
  };

  return (
    <div className="space-y-4 md:space-y-6 p-2 sm:p-4">
      <h3 className="text-lg md:text-xl font-medium">Map Columns</h3>
      
      <div className="space-y-4 md:space-y-6">
        {/* Standard Fields */}
        {fieldConfigs.map((config, index) => (
          <div key={index} className="p-3 sm:p-4 border rounded-lg bg-white shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div className="flex items-center">
                <span className="font-medium text-sm sm:text-base">
                  {config.targetField}
                  {config.isRequired && <span className="text-red-500 ml-1">*</span>}
                </span>
                {config.sourceFields.length > 1 && (
                  <span className="ml-2 text-xs sm:text-sm text-gray-500">
                    (Merged with "{config.mergeDelimiter}")
                  </span>
                )}
              </div>
              {config.sourceFields.length <= 1 && (
                <button
                  onClick={() => addSourceField(index)}
                  className="flex items-center text-xs sm:text-sm text-blue-600 hover:text-blue-800 self-start sm:self-auto"
                >
                  <Merge className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  <span className="whitespace-nowrap">Add Field to Merge</span>
                </button>
              )}
            </div>
            
            <div className="space-y-2">
              {config.sourceFields.map((field, fieldIndex) => (
                <div key={fieldIndex} className="flex items-center gap-2">
                  <select
                    value={field}
                    onChange={(e) => handleSourceFieldChange(index, fieldIndex, e.target.value)}
                    className="flex-1 p-1 text-xs sm:text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 min-w-0"
                  >
                    <option value="">Select column...</option>
                    {availableColumns.map(column => (
                      <option key={column} value={column}>{column}</option>
                    ))}
                  </select>
                  {config.sourceFields.length > 1 && (
                    <button
                      onClick={() => removeSourceField(index, fieldIndex)}
                      className="p-1 text-red-500 hover:text-red-700 flex-shrink-0"
                    >
                      <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Custom Fields */}
        {customFields.map((field, index) => (
          <div key={index} className="p-3 sm:p-4 border rounded-lg bg-white shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-3">
              <input
                type="text"
                value={field.targetField}
                onChange={(e) => {
                  const updatedFields = [...customFields];
                  updatedFields[index].targetField = e.target.value;
                  setCustomFields(updatedFields);
                }}
                placeholder="Field name"
                className="flex-1 p-1 text-xs sm:text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 min-w-0"
              />
              <button
                onClick={() => removeCustomField(index)}
                className="ml-1 p-1 text-red-500 hover:text-red-700 flex-shrink-0"
              >
                <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
            
            <div className="space-y-2">
              {field.sourceFields.map((sourceField, fieldIndex) => (
                <div key={fieldIndex} className="flex items-center gap-2">
                  <select
                    value={sourceField}
                    onChange={(e) => {
                      const updatedFields = [...customFields];
                      updatedFields[index].sourceFields[fieldIndex] = e.target.value;
                      setCustomFields(updatedFields);
                    }}
                    className="flex-1 p-1 text-xs sm:text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 min-w-0"
                  >
                    <option value="">Select column...</option>
                    {availableColumns.map(column => (
                      <option key={column} value={column}>{column}</option>
                    ))}
                  </select>
                  {field.sourceFields.length > 1 && (
                    <button
                      onClick={() => {
                        const updatedFields = [...customFields];
                        updatedFields[index].sourceFields.splice(fieldIndex, 1);
                        setCustomFields(updatedFields);
                      }}
                      className="p-1 text-red-500 hover:text-red-700 flex-shrink-0"
                    >
                      <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => {
                  const updatedFields = [...customFields];
                  updatedFields[index].sourceFields.push('');
                  setCustomFields(updatedFields);
                }}
                className="flex items-center text-xs sm:text-sm text-blue-600 hover:text-blue-800"
              >
                <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                <span className="whitespace-nowrap">Add Field to Merge</span>
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={addCustomField}
          className="flex items-center text-xs sm:text-sm text-blue-600 hover:text-blue-800"
        >
          <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
          <span className="whitespace-nowrap">Add Custom Field</span>
        </button>
      </div>

      <div className="mt-4 sm:mt-6">
        <button
          onClick={applyMapping}
          disabled={!fieldConfigs[0].sourceFields[0]} // Roll number is required
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 text-sm sm:text-base"
        >
          Apply Mapping
        </button>
      </div>

      {/* Data Preview */}
      {fieldConfigs.some(f => f.sourceFields[0]) && (
        <div className="mt-6">
          <h4 className="font-medium mb-2 text-sm sm:text-base">Preview</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {[...fieldConfigs, ...customFields]
                    .filter(config => config.sourceFields[0])
                    .map(config => (
                      <th key={config.targetField} className="px-2 sm:px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">
                        {config.targetField}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rawData.slice(0, 5).map((row, i) => (
                  <tr key={i}>
                    {[...fieldConfigs, ...customFields]
                      .filter(config => config.sourceFields[0])
                      .map((config, j) => (
                        <td key={j} className="px-2 sm:px-4 py-2 text-gray-900 whitespace-nowrap">
                          {config.sourceFields
                            .map(field => row[field] || '')
                            .filter(val => val)
                            .join(config.mergeDelimiter)}
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