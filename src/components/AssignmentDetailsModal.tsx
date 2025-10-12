import { IAssignment } from '@/types/assessment.types';
import { Calendar, Users, FileText, Download, GraduationCap, Edit, Trash2, ExternalLink } from 'lucide-react';


interface AssignmentDetailsModalProps {
  assignment: IAssignment;
  isOpen: boolean;
  onClose: () => void;
  onEvaluate: () => void;
  onDelete: () => void;
}

export function AssignmentDetailsModal({ assignment, isOpen, onClose, onEvaluate, onDelete }: AssignmentDetailsModalProps) {
  if (!isOpen) return null;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSubmissionStats = () => {
    const total = assignment.submissions.length;
    const submitted = assignment.submissions.filter(sub => sub.status === 'Submitted' || sub.status === 'Graded').length;
    const graded = assignment.submissions.filter(sub => sub.status === 'Graded').length;
    const pending = assignment.submissions.filter(sub => sub.status === 'Pending').length;

    return { total, submitted, graded, pending };
  };

  const stats = getSubmissionStats();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <FileText className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{assignment.title}</h2>
              <p className="text-gray-600">{assignment.subject} • {assignment.batch}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {assignment.submissions.length > 0 && (
              <button
                onClick={onEvaluate}
                className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition"
                title="Evaluate Submissions"
              >
                <GraduationCap className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={onDelete}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
              title="Delete Assignment"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <span className="w-5 h-5">×</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
              <p className="text-sm text-blue-700">Total Students</p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-orange-900">{stats.submitted}</p>
              <p className="text-sm text-orange-700">Submitted</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-green-900">{stats.graded}</p>
              <p className="text-sm text-green-700">Graded</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              <p className="text-sm text-gray-700">Pending</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 whitespace-pre-wrap">{assignment.description}</p>
            </div>
          </div>

          {/* Assignment Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Assignment Details</h3>
              
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Batch</p>
                  <p className="text-gray-900 font-medium">{assignment.batch}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Subject</p>
                  <p className="text-gray-900 font-medium">{assignment.subject}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <GraduationCap className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Maximum Marks</p>
                  <p className="text-gray-900 font-medium">{assignment.maxMarks}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Timeline</h3>
              
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Due Date</p>
                  <p className="text-gray-900 font-medium">{formatDate(assignment.dueDate)}</p>
                  {new Date(assignment.dueDate) < new Date() && (
                    <p className="text-xs text-red-600 mt-1">This assignment is overdue</p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Download className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Submissions</p>
                  <p className="text-gray-900 font-medium">
                    {stats.submitted} of {stats.total} submitted
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Attachments */}
          {assignment.attachments && assignment.attachments.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Attachments ({assignment.attachments.length})
              </h3>
              <div className="space-y-2">
                {assignment.attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <a
                      href={attachment}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-700 text-sm truncate flex-1"
                    >
                      {attachment}
                    </a>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Submissions */}
          {assignment.submissions.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Recent Submissions ({assignment.submissions.length})
              </h3>
              <div className="space-y-3">
                {assignment.submissions.slice(0, 5).map((submission, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                    <div>
                      <p className="font-medium text-gray-900">{submission.student}</p>
                      <p className="text-sm text-gray-500">
                        Submitted {new Date(submission.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        submission.status === 'Graded' 
                          ? 'bg-green-100 text-green-800'
                          : submission.status === 'Submitted'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {submission.status}
                      </span>
                      {submission.marks && (
                        <span className="text-sm font-medium text-gray-900">
                          {submission.marks}/{assignment.maxMarks}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                {assignment.submissions.length > 5 && (
                  <button
                    onClick={onEvaluate}
                    className="w-full text-center text-indigo-600 hover:text-indigo-700 font-medium py-2"
                  >
                    View all {assignment.submissions.length} submissions →
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}