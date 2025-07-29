'use client';
import { useState, useCallback } from 'react';
import { UploadCloud, X, Check } from 'lucide-react';

export function FileUploader({ onFileProcessed }: { onFileProcessed: (data: any) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const processFile = useCallback(async () => {
    if (!file) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/students/parse', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      onFileProcessed(data);
    } catch (error) {
      console.error('Error processing file:', error);
    } finally {
      setIsLoading(false);
    }
  }, [file, onFileProcessed]);

  return (
    <div className="space-y-4">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <UploadCloud className="w-8 h-8 mb-3 text-gray-500" />
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500">CSV or Excel files only</p>
        </div>
        <input 
          type="file" 
          className="hidden" 
          accept=".csv,.xlsx,.xls"
          onChange={handleFileChange}
        />
      </label>

      {file && (
        <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
          <span className="text-sm font-medium">{file.name}</span>
          <div className="flex space-x-2">
            <button
              onClick={() => setFile(null)}
              className="p-1 text-red-500 hover:text-red-700"
            >
              <X className="w-5 h-5" />
            </button>
            <button
              onClick={processFile}
              disabled={isLoading}
              className="p-1 text-green-500 hover:text-green-700 disabled:opacity-50"
            >
              <Check className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}