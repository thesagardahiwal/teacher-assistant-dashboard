import { IAssignment } from '@/types/assessment.types';
import { Calendar, Users, FileText, Download, Eye, GraduationCap, Trash2 } from 'lucide-react';


interface AssignmentListProps {
  assignments: IAssignment[];
  onViewAssignment: (assignment: IAssignment) => void;
  onEvaluateAssignment: (assignment: IAssignment) => void;
  onDeleteAssignment: (assignment: IAssignment) => void;
}

export function AssignmentList({ assignments, onViewAssignment, onEvaluateAssignment, onDeleteAssignment }: AssignmentListProps) {
  const getStatusColor = (assignment: IAssignment) => {
    const totalSubmissions = assignment.submissions.length;
    const gradedSubmissions = assignment.submissions.filter(sub => sub.status === 'Graded').length;
    const submittedSubmissions = assignment.submissions.filter(sub => sub.status === 'Submitted').length;

    if (gradedSubmissions === totalSubmissions && totalSubmissions > 0) {
      return 'bg-green-100 text-green-800';
    } else if (submittedSubmissions > 0) {
      return 'bg-blue-100 text-blue-800';
    } else if (new Date(assignment.dueDate) < new Date()) {
      return 'bg-red-100 text-red-800';
    } else {
      return 'bg-orange-100 text-orange-800';
    }
  };

  const getStatusText = (assignment: IAssignment) => {
    const totalSubmissions = assignment.submissions.length;
    const gradedSubmissions = assignment.submissions.filter(sub => sub.status === 'Graded').length;
    const submittedSubmissions = assignment.submissions.filter(sub => sub.status === 'Submitted').length;

    if (gradedSubmissions === totalSubmissions && totalSubmissions > 0) {
      return 'All Graded';
    } else if (submittedSubmissions > 0) {
      return `${submittedSubmissions}/${totalSubmissions} Submitted`;
    } else if (new Date(assignment.dueDate) < new Date()) {
      return 'Overdue';
    } else {
      return 'Pending';
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assignment Details
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course Info
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Submissions
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {assignments.map((assignment) => (
              <tr key={assignment._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {assignment.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                      {assignment.description}
                    </p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${getStatusColor(assignment)}`}>
                      {getStatusText(assignment)}
                    </span>
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{assignment.subject}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span>{assignment.batch}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <GraduationCap className="w-4 h-4 text-gray-400" />
                      <span>Max: {assignment.maxMarks} marks</span>
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Download className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        {assignment.submissions.length}
                      </p>
                      <p className="text-xs text-gray-500">submissions</p>
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-gray-900">{formatDate(assignment.dueDate)}</p>
                      {new Date(assignment.dueDate) < new Date() && (
                        <p className="text-xs text-red-600">Overdue</p>
                      )}
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => onViewAssignment(assignment)}
                      className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {assignment.submissions.length > 0 && (
                      <button
                        onClick={() => onEvaluateAssignment(assignment)}
                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition"
                        title="Evaluate Submissions"
                      >
                        <GraduationCap className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => onDeleteAssignment(assignment)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete Assignment"
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