"use client";

import { useEffect, useState } from 'react';
import useAssignment from '@/hooks/useAssignment';
import { AssignmentHeader } from '@/components/AssignmentHeader';
import { AssignmentGrid } from '@/components/AssignmentGrid';
import { AssignmentList } from '@/components/AssignmentList';
import { CreateAssignmentModal } from '@/components/CreateAssignmentModal';
import { AssignmentDetailsModal } from '@/components/AssignmentDetailsModal';
import { EvaluateSubmissionModal } from '@/components/EvaluateSubmissionModal';
import { DeleteAssignmentModal } from '@/components/DeleteAssignmentModal';
import { LoadingState } from '@/components/LoadingState';
import { EmptyState } from '@/components/EmptyState';
import { IAssignment } from '@/types/assessment.types';


type ViewMode = 'grid' | 'list';
type FilterType = 'all' | 'pending' | 'submitted' | 'graded';

export default function AssignmentsPage() {
  const { assignments, loading, fetchAssignments } = useAssignment();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filter, setFilter] = useState<FilterType>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [viewingAssignment, setViewingAssignment] = useState<IAssignment | null>(null);
  const [evaluatingAssignment, setEvaluatingAssignment] = useState<IAssignment | null>(null);
  const [deletingAssignment, setDeletingAssignment] = useState<IAssignment | null>(null);

  useEffect(() => {
    fetchAssignments();
  }, []);

  // Filter assignments based on selected filter
  const filteredAssignments = assignments.filter(assignment => {
    if (filter === 'all') return true;
    if (filter === 'pending') return assignment.submissions.length === 0;
    if (filter === 'submitted') {
      return assignment.submissions.some(sub => sub.status === 'Submitted');
    }
    if (filter === 'graded') {
      return assignment.submissions.some(sub => sub.status === 'Graded');
    }
    return true;
  });

  const handleViewAssignment = (assignment: IAssignment) => {
    setViewingAssignment(assignment);
  };

  const handleEvaluateAssignment = (assignment: IAssignment) => {
    setEvaluatingAssignment(assignment);
  };

  const handleDeleteAssignment = (assignment: IAssignment) => {
    setDeletingAssignment(assignment);
  };

  const handleCloseModals = () => {
    setViewingAssignment(null);
    setEvaluatingAssignment(null);
    setDeletingAssignment(null);
  };

  if (loading && assignments.length === 0) {
    return <LoadingState />;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <AssignmentHeader
        viewMode={viewMode}
        filter={filter}
        onViewModeChange={setViewMode}
        onFilterChange={setFilter}
        onCreateAssignment={() => setIsCreateModalOpen(true)}
        assignmentCount={assignments.length}
        filteredCount={filteredAssignments.length}
      />

      {/* Content */}
      {assignments.length === 0 ? (
        <EmptyState 
            title='Assignment' 
            onCreate={() => setIsCreateModalOpen(true)}
            desciption='Create your first assignment to start engaging with your students. Assignments help track progress, evaluate understanding, and provide valuable feedback.'
             />
      ) : viewMode === 'grid' ? (
        <AssignmentGrid
          assignments={filteredAssignments}
          onViewAssignment={handleViewAssignment}
          onEvaluateAssignment={handleEvaluateAssignment}
          onDeleteAssignment={handleDeleteAssignment}
        />
      ) : (
        <AssignmentList
          assignments={filteredAssignments}
          onViewAssignment={handleViewAssignment}
          onEvaluateAssignment={handleEvaluateAssignment}
          onDeleteAssignment={handleDeleteAssignment}
        />
      )}

      {/* Modals */}
      <CreateAssignmentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => setIsCreateModalOpen(false)}
      />

      {viewingAssignment && (
        <AssignmentDetailsModal
          assignment={viewingAssignment}
          isOpen={!!viewingAssignment}
          onClose={handleCloseModals}
          onEvaluate={() => handleEvaluateAssignment(viewingAssignment)}
          onDelete={() => handleDeleteAssignment(viewingAssignment)}
        />
      )}

      {evaluatingAssignment && (
        <EvaluateSubmissionModal
          assignment={evaluatingAssignment}
          isOpen={!!evaluatingAssignment}
          onClose={handleCloseModals}
          onSuccess={handleCloseModals}
        />
      )}

      {deletingAssignment && (
        <DeleteAssignmentModal
          assignment={deletingAssignment}
          isOpen={!!deletingAssignment}
          onClose={handleCloseModals}
          onSuccess={handleCloseModals}
        />
      )}
    </div>
  );
}