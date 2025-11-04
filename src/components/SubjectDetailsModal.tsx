import { BookOpen, Calendar, Users, FileText, CheckCircle, X, Edit, Trash2, List } from 'lucide-react';
import { ISubject } from '@/types/subject.types';

interface SubjectDetailsModalProps {
  subject: ISubject;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onManageSyllabus: () => void;
}

export function SubjectDetailsModal({ 
  subject, 
  isOpen, 
  onClose, 
  onEdit, 
  onDelete, 
  onManageSyllabus 
}: SubjectDetailsModalProps) {
  if (!isOpen) return null;

  const getCompletionPercentage = (syllabus: any[]) => {
    if (!syllabus.length) return 0;
    const totalTopics = syllabus.reduce((acc, module) => acc + module.topics.length, 0);
    const completedTopics = syllabus.reduce((acc, module) => acc + module.completedTopics.length, 0);
    return Math.round((completedTopics / totalTopics) * 100);
  };

  const completion = getCompletionPercentage(subject.syllabus);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{subject.name}</h2>
              <p className="text-gray-600">{subject.code} • {subject.department}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onManageSyllabus}
              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition"
              title="Manage Syllabus"
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={onEdit}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
              title="Edit Subject"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
              title="Delete Subject"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Subject Information</h3>
              
              <div className="flex items-center space-x-3">
                <BookOpen className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Subject Code</p>
                  <p className="text-gray-900 font-medium">{subject.code}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Academic Year</p>
                  <p className="text-gray-900 font-medium">
                    Year {subject.year} - Semester {subject.semester}
                  </p>
                </div>
              </div>

              {subject.credits && (
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Credits</p>
                    <p className="text-gray-900 font-medium">{subject.credits}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Progress</h3>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">Syllabus Completion</span>
                  <span className="text-sm font-semibold text-gray-900">{completion}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all"
                    style={{ width: `${completion}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>
                    {subject.syllabus.reduce((acc, module) => acc + module.completedTopics.length, 0)} topics completed
                  </span>
                  <span>
                    {subject.syllabus.reduce((acc, module) => acc + module.topics.length, 0)} total topics
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Assignments</p>
                  <p className="text-gray-900 font-medium">
                    {subject.assignments?.length || 0} assigned
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          {subject.description && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-wrap">{subject.description}</p>
              </div>
            </div>
          )}

          {/* Syllabus Preview */}
          {subject.syllabus.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Syllabus Modules ({subject.syllabus.length})
              </h3>
              <div className="space-y-3">
                {subject.syllabus.slice(0, 3).map((module, index) => (
                  <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{module.module}</h4>
                      <span className="text-sm text-gray-500">
                        {module.completedTopics.length}/{module.topics.length} topics
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {module.topics.slice(0, 4).map((topic, topicIndex) => (
                        <div key={topicIndex} className="flex items-center space-x-2">
                          {module.completedTopics.includes(topic) ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                          )}
                          <span className={`text-sm ${
                            module.completedTopics.includes(topic) 
                              ? 'text-green-700' 
                              : 'text-gray-600'
                          }`}>
                            {topic}
                          </span>
                        </div>
                      ))}
                      {module.topics.length > 4 && (
                        <div className="text-sm text-gray-500">
                          +{module.topics.length - 4} more topics
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {subject.syllabus.length > 3 && (
                  <button
                    onClick={onManageSyllabus}
                    className="w-full text-center text-indigo-600 hover:text-indigo-700 font-medium py-2"
                  >
                    View all {subject.syllabus.length} modules →
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Timestamps */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Created {new Date(subject.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Updated {new Date(subject.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}