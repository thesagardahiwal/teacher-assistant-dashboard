"use client";

import { useEffect, useState } from 'react';
import { useBatches } from '@/hooks/useBatches';
import { BatchHeader } from '@/components/BatchHeader';
import { BatchGrid } from '@/components/BatchGrid';
import { BatchList } from '@/components/BatchList';
import { CreateBatchModal } from '@/components/CreateBatchModal';
import { EditBatchModal } from '@/components/EditBatchModal';
import { DeleteBatchModal } from '@/components/DeleteBatchModal';
import { BatchDetailsModal } from '@/components/BatchDetailsModal';
import { LoadingState } from '@/components/LoadingState';
import { EmptyState } from '@/components/EmptyState';
import { IBatch } from '@/types/batch.types';


type ViewMode = 'grid' | 'list';

export default function BatchesPage() {
  const { batches, loading, fetchBatches, selectBatch } = useBatches();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingBatch, setEditingBatch] = useState<IBatch | null>(null);
  const [deletingBatch, setDeletingBatch] = useState<IBatch | null>(null);
  const [viewingBatch, setViewingBatch] = useState<IBatch | null>(null);

  useEffect(() => {
    fetchBatches();
  }, []);

  const handleEditBatch = (batch: IBatch) => {
    setEditingBatch(batch);
    selectBatch(batch);
  };

  const handleDeleteBatch = (batch: IBatch) => {
    setDeletingBatch(batch);
  };

  const handleViewBatch = (batch: IBatch) => {
    setViewingBatch(batch);
    selectBatch(batch);
  };

  const handleCloseModals = () => {
    setEditingBatch(null);
    setDeletingBatch(null);
    setViewingBatch(null);
  };

  if (loading && batches.length === 0) {
    return <LoadingState />;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <BatchHeader
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onCreateBatch={() => setIsCreateModalOpen(true)}
        batchCount={batches.length}
      />

      {/* Content */}
      {batches.length === 0 ? (
        <EmptyState onCreateBatch={() => setIsCreateModalOpen(true)} />
      ) : viewMode === 'grid' ? (
        <BatchGrid
          batches={batches}
          onViewBatch={handleViewBatch}
          onEditBatch={handleEditBatch}
          onDeleteBatch={handleDeleteBatch}
        />
      ) : (
        <BatchList
          batches={batches}
          onViewBatch={handleViewBatch}
          onEditBatch={handleEditBatch}
          onDeleteBatch={handleDeleteBatch}
        />
      )}

      {/* Modals */}
      <CreateBatchModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => setIsCreateModalOpen(false)}
      />

      {editingBatch && (
        <EditBatchModal
          batch={editingBatch}
          isOpen={!!editingBatch}
          onClose={handleCloseModals}
          onSuccess={handleCloseModals}
        />
      )}

      {deletingBatch && (
        <DeleteBatchModal
          batch={deletingBatch}
          isOpen={!!deletingBatch}
          onClose={handleCloseModals}
          onSuccess={handleCloseModals}
        />
      )}

      {viewingBatch && (
        <BatchDetailsModal
          batch={viewingBatch}
          isOpen={!!viewingBatch}
          onClose={handleCloseModals}
          onEdit={() => handleEditBatch(viewingBatch)}
          onDelete={() => handleDeleteBatch(viewingBatch)}
        />
      )}
    </div>
  );
}