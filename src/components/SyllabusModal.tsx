import { useState, useEffect } from 'react';
import { X, Plus, Trash2, CheckCircle, Circle, Upload, FileText, BookOpen } from 'lucide-react';
import { useSubjects } from '@/hooks/useSubjects';
import { ISubject } from '@/types/subject.types';

interface SyllabusModalProps {
  subject: ISubject;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface SyllabusModule {
  module: string;
  topics: string[];
  completedTopics: string[];
  proofs: string[];
}

export function SyllabusModal({ subject, isOpen, onClose, onSuccess }: SyllabusModalProps) {
  const { updateSyllabus, loading } = useSubjects();
  const [modules, setModules] = useState<SyllabusModule[]>([]);
  const [newModuleName, setNewModuleName] = useState('');
  const [newTopic, setNewTopic] = useState('');
  const [selectedModuleIndex, setSelectedModuleIndex] = useState<number | null>(null);
  const [newProof, setNewProof] = useState('');

  useEffect(() => {
    if (subject) {
      setModules(subject.syllabus || []);
    }
  }, [subject]);

  if (!isOpen) return null;

  const handleSave = async () => {
    try {
      await updateSyllabus(subject._id, { syllabus: modules });
      onSuccess();
    } catch (error) {
      console.error('Failed to update syllabus:', error);
    }
  };

  const addModule = () => {
    if (newModuleName.trim()) {
      const newModule: SyllabusModule = {
        module: newModuleName.trim(),
        topics: [],
        completedTopics: [],
        proofs: [],
      };
      setModules([...modules, newModule]);
      setNewModuleName('');
    }
  };

  const removeModule = (index: number) => {
    setModules(modules.filter((_, i) => i !== index));
  };

  const addTopic = (moduleIndex: number) => {
    if (newTopic.trim()) {
      const updatedModules = [...modules];
      updatedModules[moduleIndex].topics.push(newTopic.trim());
      setModules(updatedModules);
      setNewTopic('');
    }
  };

  const removeTopic = (moduleIndex: number, topicIndex: number) => {
    const updatedModules = [...modules];
    const topic = updatedModules[moduleIndex].topics[topicIndex];
    
    // Remove from completed topics if it was completed
    updatedModules[moduleIndex].completedTopics = 
      updatedModules[moduleIndex].completedTopics.filter(t => t !== topic);
    
    updatedModules[moduleIndex].topics.splice(topicIndex, 1);
    setModules(updatedModules);
  };

  const toggleTopicCompletion = (moduleIndex: number, topic: string) => {
    const updatedModules = [...modules];
    const module = updatedModules[moduleIndex];
    
    if (module.completedTopics.includes(topic)) {
      module.completedTopics = module.completedTopics.filter(t => t !== topic);
    } else {
      module.completedTopics.push(topic);
    }
    
    setModules(updatedModules);
  };

  const addProof = (moduleIndex: number) => {
    if (newProof.trim()) {
      const updatedModules = [...modules];
      updatedModules[moduleIndex].proofs.push(newProof.trim());
      setModules(updatedModules);
      setNewProof('');
    }
  };

  const removeProof = (moduleIndex: number, proofIndex: number) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].proofs.splice(proofIndex, 1);
    setModules(updatedModules);
  };

  const getModuleCompletion = (module: SyllabusModule) => {
    if (!module.topics.length) return 0;
    return Math.round((module.completedTopics.length / module.topics.length) * 100);
  };

  const getOverallCompletion = () => {
    if (!modules.length) return 0;
    const totalTopics = modules.reduce((acc, module) => acc + module.topics.length, 0);
    const completedTopics = modules.reduce((acc, module) => acc + module.completedTopics.length, 0);
    return Math.round((completedTopics / totalTopics) * 100);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Manage Syllabus</h2>
            <p className="text-gray-600">
              {subject.name} • {subject.code}
            </p>
            <div className="flex items-center space-x-4 mt-2">
              <div className="text-sm text-gray-500">
                {modules.length} modules • {getOverallCompletion()}% completed
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Add New Module */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Add New Module</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                value={newModuleName}
                onChange={(e) => setNewModuleName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addModule())}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter module name..."
              />
              <button
                onClick={addModule}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modules List */}
          <div className="space-y-4">
            {modules.map((module, moduleIndex) => (
              <div key={moduleIndex} className="border border-gray-200 rounded-lg">
                {/* Module Header */}
                <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold text-gray-900">{module.module}</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {getModuleCompletion(module)}% complete
                    </span>
                  </div>
                  <button
                    onClick={() => removeModule(moduleIndex)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 space-y-4">
                  {/* Add Topic */}
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={selectedModuleIndex === moduleIndex ? newTopic : ''}
                      onChange={(e) => setNewTopic(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTopic(moduleIndex))}
                      onFocus={() => setSelectedModuleIndex(moduleIndex)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Add a topic..."
                    />
                    <button
                      onClick={() => addTopic(moduleIndex)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Topics List */}
                  {module.topics.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900 text-sm">Topics:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {module.topics.map((topic, topicIndex) => (
                          <div
                            key={topicIndex}
                            className="flex items-center justify-between p-2 bg-white border border-gray-200 rounded-lg"
                          >
                            <div className="flex items-center space-x-2 flex-1">
                              <button
                                onClick={() => toggleTopicCompletion(moduleIndex, topic)}
                                className="flex-shrink-0"
                              >
                                {module.completedTopics.includes(topic) ? (
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                ) : (
                                  <Circle className="w-4 h-4 text-gray-400" />
                                )}
                              </button>
                              <span
                                className={`text-sm flex-1 ${
                                  module.completedTopics.includes(topic)
                                    ? 'text-green-700 line-through'
                                    : 'text-gray-700'
                                }`}
                              >
                                {topic}
                              </span>
                            </div>
                            <button
                              onClick={() => removeTopic(moduleIndex, topicIndex)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded transition ml-2"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Teaching Proofs */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900 text-sm">Teaching Proofs:</h4>
                      <button
                        onClick={() => addProof(moduleIndex)}
                        className="flex items-center space-x-1 text-xs text-indigo-600 hover:text-indigo-700"
                      >
                        <Upload className="w-3 h-3" />
                        <span>Add Proof</span>
                      </button>
                    </div>
                    
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newProof}
                        onChange={(e) => setNewProof(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addProof(moduleIndex))}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                        placeholder="Enter proof URL (PPT, notes, video)..."
                      />
                    </div>

                    {module.proofs.length > 0 && (
                      <div className="space-y-1">
                        {module.proofs.map((proof, proofIndex) => (
                          <div
                            key={proofIndex}
                            className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded text-sm"
                          >
                            <div className="flex items-center space-x-2 flex-1">
                              <FileText className="w-3 h-3 text-gray-400" />
                              <span className="text-gray-600 truncate">{proof}</span>
                            </div>
                            <button
                              onClick={() => removeProof(moduleIndex, proofIndex)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded transition"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {modules.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No modules added yet. Start by adding your first module.</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-3 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Syllabus'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}