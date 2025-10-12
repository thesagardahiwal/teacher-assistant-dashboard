'use client';

import { useEffect, useState } from 'react';
import useDiary from '@/hooks/useDiary';
import useAuth from '@/hooks/useAuth';
import { DiaryHeader } from '@/components/DiaryHeader';
import { DiaryList } from '@/components/DiaryList';
import { DiaryCalendarView } from '@/components/DiaryCalendarView';
import { CreateDiaryModal } from '@/components/CreateDiaryModal';
import { EditDiaryModal } from '@/components/EditDiaryModal';
import { ViewDiaryModal } from '@/components/ViewDiaryModal';
import { DeleteConfirmationModal } from '@/components/DeleteConfirmationModal';
import { LoadingState } from '@/components/LoadingState';
import { ITeachingDiary } from '@/types/teachingDiary.types';


type ViewMode = 'list' | 'calendar';

export default function DiaryPage() {
  const { user } = useAuth();
  const { entries, loading, getDiaryEntries } = useDiary();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<ITeachingDiary | null>(null);
  const [deleteEntry, setDeleteEntry] = useState<ITeachingDiary | null>(null);

//   useEffect(() => {
//     if (user?.teacherId) {
//       getDiaryEntries(user.teacherId);
//     }
//   }, [user?.teacherId, getDiaryEntries]);

  const handleViewEntry = (entry: ITeachingDiary) => {
    setSelectedEntry(entry);
  };

  const handleEditEntry = (entry: ITeachingDiary) => {
    setSelectedEntry(entry);
  };

  const handleDeleteEntry = (entry: ITeachingDiary) => {
    setDeleteEntry(entry);
  };

  const handleCloseModals = () => {
    setSelectedEntry(null);
    setDeleteEntry(null);
  };

  if (loading && entries.length === 0) {
    return <LoadingState />;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <DiaryHeader
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onCreateEntry={() => setIsCreateModalOpen(true)}
        entryCount={entries.length}
      />

      {/* Content */}
      {viewMode === 'list' ? (
        <DiaryList
          entries={entries}
          onViewEntry={handleViewEntry}
          onEditEntry={handleEditEntry}
          onDeleteEntry={handleDeleteEntry}
        />
      ) : (
        <DiaryCalendarView
          entries={entries}
          onEntryClick={handleViewEntry}
        />
      )}

      {/* Empty State */}
      {entries.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📚</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No diary entries yet
          </h3>
          <p className="text-gray-500 mb-4">
            Start documenting your teaching sessions to keep track of your progress.
          </p>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Create Your First Entry
          </button>
        </div>
      )}

      {/* Modals */}
      <CreateDiaryModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => setIsCreateModalOpen(false)}
      />

      {selectedEntry && (
        <>
          <ViewDiaryModal
            entry={selectedEntry}
            onClose={handleCloseModals}
            onEdit={() => handleEditEntry(selectedEntry)}
            onDelete={() => handleDeleteEntry(selectedEntry)}
          />
          <EditDiaryModal
            entry={selectedEntry}
            isOpen={!!selectedEntry}
            onClose={handleCloseModals}
            onSuccess={handleCloseModals}
          />
        </>
      )}

      <DeleteConfirmationModal
        entry={deleteEntry}
        isOpen={!!deleteEntry}
        onClose={handleCloseModals}
        onSuccess={handleCloseModals}
      />
    </div>
  );
}