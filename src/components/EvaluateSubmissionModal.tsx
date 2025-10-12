import { useState } from 'react';
import { X, Search, Download, CheckCircle } from 'lucide-react';
import useAssignment from '@/hooks/useAssignment';
import { IAssignment } from '@/types/assessment.types';


interface EvaluateSubmissionModalProps {
  assignment: IAssignment;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function EvaluateSubmissionModal({ assignment, isOpen, onClose, onSuccess }: EvaluateSubmissionModalProps) {
  const { evaluateAssignment, loading } = useAssignment();
  const [searchTerm, setSearchTerm] = useState('');
  const [evaluations, setEvaluations] = useState<{ [key: string]: { marks: number; remarks: string } }>({});

  if (!isOpen) return null;

  const filteredSubmissions = assignment.submissions.filter(submission =>
    submission.student.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEvaluationChange = (studentId: string, field: 'marks' | 'remarks', value: string | number) => {
    setEvaluations(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value
      }
    }));
  };

  const handleSubmitEvaluation = async (submission: any) => {
    const evaluation = evaluations[submission.student];
    if (!evaluation || !evaluation.marks) return;

    try {
      await evaluateAssignment({
        assignmentId: assignment._id,
        studentId: submission.student,
        marks: evaluation.marks,
        remarks: evaluation.remarks || '',
      });
      
      // Remove from evaluations after successful submission
      setEvaluations(prev => {
        const newEvals = { ...prev };
        delete newEvals[submission.student];
        return newEvals;
      });
    } catch (error) {
      console.error('Failed to evaluate submission:', error);
    }
  };

  const getRemainingSubmissions = () => {
    return assignment.submissions.filter(sub => sub.status !== 'Graded').length;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Evaluate Submissions</h2>
            <p className="text-gray-600">
              {assignment.title} • {getRemainingSubmissions()} remaining
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Submissions List */}
        <div className="p-6">
          <div className="space-y-4">
            {filteredSubmissions.map((submission) => (
              <div
                key={submission.student}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{submission.student}</h4>
                    <p className="text-sm text-gray-500">
                      Submitted {new Date(submission.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      submission.status === 'Graded' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {submission.status}
                    </span>
                    {submission.fileUrl && (
                      <a
                        href={submission.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 text-gray-400 hover:text-indigo-600 transition"
                        title="Download Submission"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {submission.status !== 'Graded' ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Marks (0-{assignment.maxMarks})
                      </label>
                      <input
                        type="number"
                        min="0"
                        max={assignment.maxMarks}
                        value={evaluations[submission.student]?.marks || ''}
                        onChange={(e) => handleEvaluationChange(submission.student, 'marks', Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter marks"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Remarks
                      </label>
                      <input
                        type="text"
                        value={evaluations[submission.student]?.remarks || ''}
                        onChange={(e) => handleEvaluationChange(submission.student, 'remarks', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Add remarks..."
                      />
                    </div>
                  </div>
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-green-900">
                          Graded: {submission.marks}/{assignment.maxMarks}
                        </p>
                        {submission.remarks && (
                          <p className="text-sm text-green-700 mt-1">{submission.remarks}</p>
                        )}
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                )}

                {submission.status !== 'Graded' && evaluations[submission.student]?.marks && (
                  <div className="flex justify-end mt-3">
                    <button
                      onClick={() => handleSubmitEvaluation(submission)}
                      disabled={loading}
                      className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Submit Grade</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredSubmissions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No submissions found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}