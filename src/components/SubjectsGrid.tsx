import { ISubject } from '@/types/subject.types';
import { BookOpen, Calendar, Users, FileText, MoreVertical, Eye, Edit, Trash2, List } from 'lucide-react';

import { useState } from 'react';

interface SubjectsGridProps {
  subjects: ISubject[];
  onViewSubject: (subject: ISubject) => void;
  onEditSubject: (subject: ISubject) => void;
  onDeleteSubject: (subject: ISubject) => void;
  onManageSyllabus: (subject: ISubject) => void;
}

export function SubjectsGrid({ subjects, onViewSubject, onEditSubject, onDeleteSubject, onManageSyllabus }: SubjectsGridProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const getCompletionPercentage = (syllabus: any[]) => {
    if (!syllabus.length) return 0;
    const totalTopics = syllabus.reduce((acc, module) => acc + module.topics.length, 0);
    const completedTopics = syllabus.reduce((acc, module) => acc + module.completedTopics.length, 0);
    return Math.round((completedTopics / totalTopics) * 100);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {subjects.map((subject) => {
        const completion = getCompletionPercentage(subject.syllabus);
        
        return (
          <div
            key={subject._id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {subject.name}
                  </h3>
                  <p className="text-sm text-gray-600">{subject.code}</p>
                </div>
                
                {/* Dropdown Menu */}
                <div className="relative">
                  <button
                    onClick={() => setActiveMenu(activeMenu === subject._id ? null : subject._id)}
                    className="p-1 hover:bg-gray-100 rounded-lg transition"
                  >
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>
                  
                  {activeMenu === subject._id && (
                    <div className="absolute right-0 top-8 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                      <button
                        onClick={() => {
                          onViewSubject(subject);
                          setActiveMenu(null);
                        }}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                      <button
                        onClick={() => {
                          onManageSyllabus(subject);
                          setActiveMenu(null);
                        }}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <List className="w-4 h-4" />
                        <span>Manage Syllabus</span>
                      </button>
                      <button
                        onClick={() => {
                          onEditSubject(subject);
                          setActiveMenu(null);
                        }}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Edit Subject</span>
                      </button>
                      <button
                        onClick={() => {
                          onDeleteSubject(subject);
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
              
              {subject.description && (
                <p className="text-gray-600 text-sm line-clamp-2">
                  {subject.description}
                </p>
              )}
            </div>

            {/* Stats */}
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Year/Sem</span>
                </div>
                <span className="font-semibold text-gray-900">
                  {subject.year} - Sem {subject.semester}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2 text-gray-600">
                  <BookOpen className="w-4 h-4" />
                  <span>Credits</span>
                </div>
                <span className="font-semibold text-gray-900">{subject.credits || 'N/A'}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2 text-gray-600">
                  <FileText className="w-4 h-4" />
                  <span>Syllabus Progress</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all"
                      style={{ width: `${completion}%` }}
                    ></div>
                  </div>
                  <span className="font-semibold text-gray-900 text-xs">
                    {completion}%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>Assignments</span>
                </div>
                <span className="font-semibold text-gray-900">
                  {subject.assignments?.length || 0}
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 rounded-b-xl">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1 text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span>Created {formatDate(subject.createdAt)}</span>
                </div>
                <button
                  onClick={() => onViewSubject(subject)}
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}