"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchBatches,
  createBatch,
  updateBatch,
  deleteBatch,
} from "@/features/batch/batchThunks";
import { setSelectedBatch } from "@/features/batch/batchSlice";
import { useEffect, useCallback, useMemo } from "react";

export const useBatches = () => {
  const dispatch = useAppDispatch();
  const { list, loading, error, selectedBatch, isFetched } = useAppSelector(
    (state) => state.batches
  );

  useEffect(() => {
    if (!isFetched) {
      dispatch(fetchBatches());
    }
  }, [dispatch, isFetched]);


  const fetchAll = useCallback(() => dispatch(fetchBatches()), [dispatch]);
  const create = useCallback((data: any) => dispatch(createBatch(data)), [dispatch]);
  const update = useCallback(
    (batchId: string, data: any) => dispatch(updateBatch({ batchId, data })),
    [dispatch]
  );
  const remove = useCallback((batchId: string) => dispatch(deleteBatch(batchId)), [dispatch]);
  const select = useCallback((batch: any) => dispatch(setSelectedBatch(batch)), [dispatch]);

  // ✅ Memoize entire return object
  return useMemo(
    () => ({
      batches: Array.isArray(list) ? list : [],
      loading,
      error,
      selectedBatch,
      fetchBatches: fetchAll,
      createBatch: create,
      updateBatch: update,
      deleteBatch: remove,
      selectBatch: select,
    }),
    [list, loading, error, selectedBatch, fetchAll, create, update, remove, select]
  );
};