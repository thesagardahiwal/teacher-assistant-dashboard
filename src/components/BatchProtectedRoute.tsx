import { useBatches } from '@/hooks/useBatches';
import { AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function BatchProtectedRoute({ children }: { children: React.ReactNode }) {
  const { batches, loading } = useBatches();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <p className="text-gray-500">Loading batches...</p>
      </div>
    );
  }

  if (!batches || batches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center">
        <div className="text-gray-700 dark:text-white p-10 rounded-2xl shadow-lg w-full max-w-md">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="w-14 h-14 text-yellow-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No Batches Found</h2>
          <p className="text-gray-700 dark:text-white mb-6">
            You haven’t created any batches yet. Create a batch to start managing students.
          </p>
          <button
            onClick={() => router.push("/dashboard/batches")}
            className="bg-blue-600 hover:bg-blue-700 transition-all px-6 py-2 rounded-lg text-white font-medium"
          >
            Create Batch
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
