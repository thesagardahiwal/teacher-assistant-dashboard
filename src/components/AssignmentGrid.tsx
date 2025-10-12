import { IAssignment } from '@/types/assessment.types';
import { Calendar, Users, FileText, Download, MoreVertical, Eye, Edit, Trash2, GraduationCap } from 'lucide-react';
import { useState } from 'react';

interface AssignmentGridProps {
  assignments: IAssignment[];
  onViewAssignment: (assignment: IAssignment) => void;
  onEvaluateAssignment: (assignment: IAssignment) => void;
  onDeleteAssignment: (assignment: IAssignment) => void;
}

export function AssignmentGrid({ assignments, onViewAssignment, onEvaluateAssignment, onDeleteAssignment }: AssignmentGridProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const getStatusColor = (assignment: IAssignment) => {
    const totalSubmissions = assignment.submissions.length;
    const gradedSubmissions = assignment.submissions.filter(sub => sub.status === 'Graded').length;
    const submittedSubmissions = assignment.submissions.filter(sub => sub.status === 'Submitted').length;

    if (gradedSubmissions === totalSubmissions && totalSubmissions > 0) {
      return 'bg-green-100 text-green-800 border-green-200';
    } else if (submittedSubmissions > 0) {
      return 'bg-blue-100 text-blue-800 border-blue-200';
    } else if (new Date(assignment.dueDate) < new Date()) {
      return 'bg-red-100 text-red-800 border-red-200';
    } else {
      return 'bg-orange-100 text-orange-800 border-orange-200';
    }
  };

  const getStatusText = (assignment: IAssignment) => {
    const totalSubmissions = assignment.submissions.length;
    const gradedSubmissions = assignment.submissions.filter(sub => sub.status === 'Graded').length;
    const submittedSubmissions = assignment.submissions.filter(sub => sub.status === 'Submitted').length;

    if (gradedSubmissions === totalSubmissions && totalSubmissions > 0) {
      return 'All Graded';
    } else if (submittedSubmissions > 0) {
      return `${submittedSubmissions} Submitted`;
    } else if (new Date(assignment.dueDate) < new Date()) {
      return 'Overdue';
    } else {
      return 'Pending';
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const isDueSoon = (dueDate: Date) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {assignments.map((assignment, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {assignment.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(assignment)}`}>
                    {getStatusText(assignment)}
                  </span>
                  {isDueSoon(assignment.dueDate) && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                      Due Soon
                    </span>
                  )}
                </div>
              </div>
              
              {/* Dropdown Menu */}
              <div className="relative">
                <button
                  onClick={() => setActiveMenu(activeMenu === assignment._id ? null : assignment._id)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition"
                >
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </button>
                
                {activeMenu === assignment._id && (
                  <div className="absolute right-0 top-8 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    <button
                      onClick={() => {
                        onViewAssignment(assignment);
                        setActiveMenu(null);
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                    {assignment.submissions.length > 0 && (
                      <button
                        onClick={() => {
                          onEvaluateAssignment(assignment);
                          setActiveMenu(null);
                        }}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <GraduationCap className="w-4 h-4" />
                        <span>Evaluate</span>
                      </button>
                    )}
                    <button
                      onClick={() => {
                        onDeleteAssignment(assignment);
                        setActiveMenu(null);
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <p className="text-gray-600 text-sm line-clamp-2">
              {assignment.description}
            </p>
          </div>

          {/* Stats */}
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <Users className="w-4 h-4" />
                <span>Batch</span>
              </div>
              <span className="font-semibold text-gray-900">{assignment.batch}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <FileText className="w-4 h-4" />
                <span>Subject</span>
              </div>
              <span className="font-semibold text-gray-900">{assignment.subject}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <Download className="w-4 h-4" />
                <span>Submissions</span>
              </div>
              <span className="font-semibold text-gray-900">
                {assignment.submissions.length}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <GraduationCap className="w-4 h-4" />
                <span>Max Marks</span>
              </div>
              <span className="font-semibold text-gray-900">{assignment.maxMarks}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 rounded-b-xl">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-1 text-gray-500">
                <Calendar className="w-3 h-3" />
                <span>Due {formatDate(assignment.dueDate)}</span>
              </div>
              <button
                onClick={() => onViewAssignment(assignment)}
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}