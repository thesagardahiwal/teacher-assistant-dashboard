'use client';
import { useState } from 'react';
import { FileUploader } from './FileUploader';
import { ColumnMapper } from './ColumnMapper';
import { DataReview } from './DataReview';
import { ArrowLeft, RefreshCw, AlertTriangle } from 'lucide-react';

export function StudentImporter() {
  const [step, setStep] = useState<'upload' | 'map' | 'review'>('upload');
  const [fileData, setFileData] = useState<any>(null);
  const [mappedData, setMappedData] = useState<any[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileProcessed = (data: any) => {
    setFileData(data);
    setStep('map');
  };

  const handleMappingComplete = (data: any[]) => {
    setMappedData(data);
    setStep('review');
  };

  const goBack = () => {
    if (step === 'review') {
      setStep('map');
    } else if (step === 'map') {
      setStep('upload');
    }
  };

  const resetProcess = () => {
    setFileData(null);
    setMappedData([]);
    setStep('upload');
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/students/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ students: mappedData }),
      });

      const result = await response.json();
      if (response.ok) {
        alert(`Successfully imported ${mappedData.length} students`);
        resetProcess();
      } else {
        throw new Error(result.error || 'Import failed');
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Import failed');
    } finally {
      setIsSubmitting(false);
      setShowConfirmModal(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-yellow-500 mr-2 mt-0.5" />
              <div>
                <h3 className="text-lg font-medium mb-2">Confirm Import</h3>
                <p className="text-gray-600 mb-4">
                  You're about to import {mappedData.length} student records. 
                  This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleFinalSubmit}
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-70"
                  >
                    {isSubmitting ? 'Importing...' : 'Confirm Import'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Import Students</h2>
          {step !== 'upload' && (
            <button
              onClick={resetProcess}
              className="flex items-center text-sm text-gray-600 hover:text-gray-800"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Start Over
            </button>
          )}
        </div>
        
        <div className="flex mt-4 relative">
          <StepIndicator step={1} current={step} label="Upload" />
          <StepIndicator step={2} current={step} label="Map Columns" />
          <StepIndicator step={3} current={step} label="Review" />
        </div>
      </div>

      {step === 'upload' && <FileUploader onFileProcessed={handleFileProcessed} />}
      
      {step === 'map' && fileData && (
        <div>
          <ColumnMapper 
            rawData={fileData.rawData} 
            onMappingComplete={handleMappingComplete} 
          />
          <div className="flex justify-between mt-6">
            <button
              onClick={goBack}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Upload
            </button>
            <div></div> {/* Spacer */}
          </div>
        </div>
      )}
      
      {step === 'review' && mappedData.length > 0 && (
        <div>
          <DataReview 
            data={mappedData} 
            onSubmit={() => setShowConfirmModal(true)} 
          />
          <div className="flex justify-between mt-6">
            <button
              onClick={goBack}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Mapping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function StepIndicator({ step, current, label }: {
  step: number;
  current: string;
  label: string;
}) {
  const stepMap = { upload: 1, map: 2, review: 3 };
  const currentStep = stepMap[current as keyof typeof stepMap] || 1;
  
  return (
    <div className={`flex-1 flex items-center ${step > 1 ? 'pl-4' : ''}`}>
      <div className={`flex items-center justify-center w-8 h-8 rounded-full 
        ${currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
        {step}
      </div>
      <div className={`ml-2 text-sm ${currentStep >= step ? 'font-medium text-gray-800' : 'text-gray-500'}`}>
        {label}
      </div>
      {step < 3 && (
        <div className={`flex-1 h-px mx-4 ${currentStep > step ? 'bg-blue-600' : 'bg-gray-200'}`} />
      )}
    </div>
  );
}