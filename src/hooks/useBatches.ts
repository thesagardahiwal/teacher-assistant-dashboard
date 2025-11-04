"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchBatches,
  createBatch,
  updateBatch,
  deleteBatch,
} from "@/features/batch/batchThunks";
import { setSelectedBatch } from "@/features/batch/batchSlice";
import { useEffect } from "react";

export const useBatches = () => {
  const dispatch = useAppDispatch();
  const { list, loading, error, selectedBatch } = useAppSelector(
    (state) => state.batches
  );

  useEffect(() => {
    // ✅ Only fetch once when component mounts if not already loaded
    if (!Array.isArray(list) || list.length === 0) {
      dispatch(fetchBatches());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 👈 Empty dependency ensures no infinite loop

  return {
    batches: Array.isArray(list) ? list : [], // ✅ Always return array
    loading,
    error,
    selectedBatch,
    fetchBatches: () => dispatch(fetchBatches()),
    createBatch: (data: any) => dispatch(createBatch(data)),
    updateBatch: (batchId: string, data: any) =>
      dispatch(updateBatch({ batchId, data })),
    deleteBatch: (batchId: string) => dispatch(deleteBatch(batchId)),
    selectBatch: (batch: any) => dispatch(setSelectedBatch(batch)),
  };
};
