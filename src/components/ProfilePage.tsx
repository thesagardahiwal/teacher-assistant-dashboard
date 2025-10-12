'use client';

import { useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { LoadingState } from '@/components/LoadingState';
import { ProfileHeader } from '@/components/ProfileHeader';
import { ProfileInfo } from '@/components/ProfileInfo';
import { LeaveBalance } from '@/components/LeaveBalance';
import { ProfileActions } from '@/components/ProfileActions';
import { EditProfileModal } from '@/components/EditProfileModal';

export default function ProfilePage() {
  const { user, loading, error } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (loading) {
    return <LoadingState />;
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Please log in to view your profile</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header Section */}
      <ProfileHeader 
        user={user}
        onEdit={() => setIsEditModalOpen(true)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Personal Info */}
        <div className="lg:col-span-2 space-y-6">
          <ProfileInfo user={user} />
        </div>

        {/* Right Column - Leave Balance & Actions */}
        <div className="space-y-6">
          <LeaveBalance leaveBalance={user.leaveBalance} />
          <ProfileActions />
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
      />
    </div>
  );
}