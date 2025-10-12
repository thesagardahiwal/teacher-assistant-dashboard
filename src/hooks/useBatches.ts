"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBatches, createBatch, updateBatch, deleteBatch } from "@/features/batch/batchThunks";
import { setSelectedBatch } from "@/features/batch/batchSlice";

export const useBatches = () => {
  const dispatch = useAppDispatch();
  const { list, loading, error, selectedBatch } = useAppSelector((state) => state.batches);

  return {
    batches: list,
    loading,
    error,
    selectedBatch,
    fetchBatches: () => dispatch(fetchBatches()),
    createBatch: (data: any) => dispatch(createBatch(data)),
    updateBatch: (batchId: string, data: any) => dispatch(updateBatch({ batchId, data })),
    deleteBatch: (batchId: string) => dispatch(deleteBatch(batchId)),
    selectBatch: (batch: any) => dispatch(setSelectedBatch(batch)),
  };
};
