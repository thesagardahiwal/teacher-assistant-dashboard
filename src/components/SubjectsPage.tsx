"use client";

import { useEffect, useState } from 'react';
import { useSubjects } from '@/hooks/useSubjects';
import { useBatches } from '@/hooks/useBatches';
import { SubjectsHeader } from '@/components/SubjectsHeader';
import { SubjectsGrid } from '@/components/SubjectsGrid';
import { SubjectsList } from '@/components/SubjectsList';
import { CreateSubjectModal } from '@/components/CreateSubjectModal';
import { SubjectDetailsModal } from '@/components/SubjectDetailsModal';
import { EditSubjectModal } from '@/components/EditSubjectModal';
import { DeleteSubjectModal } from '@/components/DeleteSubjectModal';
import { SyllabusModal } from '@/components/SyllabusModal';
import { LoadingState } from '@/components/LoadingState';
import { EmptyState } from '@/components/EmptyState';
import { BatchSelector } from '@/components/BatchSelector';
import { ISubject } from '@/types/subject.types';
import { IBatch } from '@/types/batch.types';

type ViewMode = 'grid' | 'list';

export default function SubjectsPage() {
  const { subjects, loading, fetchSubjects, fetchAllSubjects } = useSubjects();
  const { batches, loading: batchesLoading } = useBatches();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedBatch, setSelectedBatch] = useState<IBatch | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [viewingSubject, setViewingSubject] = useState<ISubject | null>(null);
  const [editingSubject, setEditingSubject] = useState<ISubject | null>(null);
  const [deletingSubject, setDeletingSubject] = useState<ISubject | null>(null);
  const [managingSyllabus, setManagingSyllabus] = useState<ISubject | null>(null);
  useEffect(() => {
    if (selectedBatch) {
      fetchSubjects(selectedBatch._id);
    }
  }, [selectedBatch]);

  useEffect(() => {
    fetchAllSubjects();
  }, []);

  // Filter subjects by selected batch
  const filteredSubjects = selectedBatch 
    ? subjects.filter(subject => subject.batch._id === selectedBatch._id)
    : [];
    console.log(subjects)
  const handleViewSubject = (subject: ISubject) => {
    setViewingSubject(subject);
  };

  const handleEditSubject = (subject: ISubject) => {
    setEditingSubject(subject);
  };

  const handleDeleteSubject = (subject: ISubject) => {
    setDeletingSubject(subject);
  };

  const handleManageSyllabus = (subject: ISubject) => {
    setManagingSyllabus(subject);
  };

  const handleCloseModals = () => {
    setViewingSubject(null);
    setEditingSubject(null);
    setDeletingSubject(null);
    setManagingSyllabus(null);
  };

  if (batchesLoading) {
    return <LoadingState />;
  }

  if (batches.length === 0) {
    return (
        <EmptyState
            title='Batches'
            desciption=' You need to create batches before you can manage subjects. Subjects are organized within batches to help you manage your teaching effectively.'
            onCreate={() => window.location.href = '/dashboard/batches'}
        />
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <SubjectsHeader
        key={selectedBatch ? selectedBatch._id + "s0000" : "sample-key"}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onCreateSubject={() => setIsCreateModalOpen(true)}
        subjectCount={filteredSubjects.length}
        disabled={!selectedBatch}
      />

      {/* Batch Selector */}
      <BatchSelector
        batches={batches}
        selectedBatch={selectedBatch}
        onBatchChange={setSelectedBatch}
      />

      {/* Content */}
      {!selectedBatch ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <div className="text-gray-400 text-6xl mb-4">📚</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Select a Batch
          </h3>
          <p className="text-gray-500">
            Choose a batch to view and manage subjects
          </p>
        </div>
      ) : loading ? (
        <LoadingState />
      ) : filteredSubjects.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <div className="text-gray-400 text-6xl mb-4">📖</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No subjects for {selectedBatch.name}
          </h3>
          <p className="text-gray-500 mb-4">
            Start by creating subjects for this batch
          </p>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Create Subject
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <SubjectsGrid
          subjects={filteredSubjects}
          onViewSubject={handleViewSubject}
          onEditSubject={handleEditSubject}
          onDeleteSubject={handleDeleteSubject}
          onManageSyllabus={handleManageSyllabus}
        />
      ) : (
        <SubjectsList
          subjects={filteredSubjects}
          onViewSubject={handleViewSubject}
          onEditSubject={handleEditSubject}
          onDeleteSubject={handleDeleteSubject}
          onManageSyllabus={handleManageSyllabus}
        />
      )}

      {/* Modals */}
      <CreateSubjectModal
        key={selectedBatch?._id || "no-batch"}
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => setIsCreateModalOpen(false)}
        batch={selectedBatch}
      />

      {viewingSubject && (
        <SubjectDetailsModal
          subject={viewingSubject}
          isOpen={!!viewingSubject}
          onClose={handleCloseModals}
          onEdit={() => handleEditSubject(viewingSubject)}
          onDelete={() => handleDeleteSubject(viewingSubject)}
          onManageSyllabus={() => handleManageSyllabus(viewingSubject)}
        />
      )}

      {editingSubject && (
        <EditSubjectModal
          subject={editingSubject}
          isOpen={!!editingSubject}
          onClose={handleCloseModals}
          onSuccess={handleCloseModals}
        />
      )}

      {deletingSubject && (
        <DeleteSubjectModal
          subject={deletingSubject}
          isOpen={!!deletingSubject}
          onClose={handleCloseModals}
          onSuccess={handleCloseModals}
        />
      )}

      {managingSyllabus && (
        <SyllabusModal
          subject={managingSyllabus}
          isOpen={!!managingSyllabus}
          onClose={handleCloseModals}
          onSuccess={handleCloseModals}
        />
      )}
    </div>
  );
}