import { ISubject } from '@/types/subject.types';
import { BookOpen, Calendar, Users, FileText, Eye, Edit, Trash2, List } from 'lucide-react';


interface SubjectsListProps {
  subjects: ISubject[];
  onViewSubject: (subject: ISubject) => void;
  onEditSubject: (subject: ISubject) => void;
  onDeleteSubject: (subject: ISubject) => void;
  onManageSyllabus: (subject: ISubject) => void;
}

export function SubjectsList({ subjects, onViewSubject, onEditSubject, onDeleteSubject, onManageSyllabus }: SubjectsListProps) {
  const getCompletionPercentage = (syllabus: any[]) => {
    if (!syllabus.length) return 0;
    const totalTopics = syllabus.reduce((acc, module) => acc + module.topics.length, 0);
    const completedTopics = syllabus.reduce((acc, module) => acc + module.completedTopics.length, 0);
    return Math.round((completedTopics / totalTopics) * 100);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subject Details
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Academic Info
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Progress
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assignments
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {subjects.map((subject) => {
              const completion = getCompletionPercentage(subject.syllabus);
              
              return (
                <tr key={subject._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {subject.name}
                      </h3>
                      <p className="text-gray-600 text-sm">{subject.code}</p>
                      {subject.description && (
                        <p className="text-gray-500 text-sm line-clamp-2 mt-1">
                          {subject.description}
                        </p>
                      )}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>Year {subject.year} - Sem {subject.semester}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <BookOpen className="w-4 h-4 text-gray-400" />
                        <span>{subject.credits || 'No'} credits</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {subject.department}
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full transition-all"
                            style={{ width: `${completion}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
                        {completion}%
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {subject.syllabus.reduce((acc, module) => acc + module.completedTopics.length, 0)}/
                      {subject.syllabus.reduce((acc, module) => acc + module.topics.length, 0)} topics
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="font-semibold text-gray-900">
                          {subject.assignments?.length || 0}
                        </p>
                        <p className="text-xs text-gray-500">assignments</p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => onViewSubject(subject)}
                        className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onManageSyllabus(subject)}
                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition"
                        title="Manage Syllabus"
                      >
                        <List className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onEditSubject(subject)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Edit Subject"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteSubject(subject)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete Subject"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}