import { fetchHandler } from "@/lib/apiClient";
import { IBatch } from "@/types/batch.types";

export interface Batch extends IBatch{
  _id: string;
}

export const batchService = {
  getAll: () => fetchHandler.get<Batch[]>("/batches"),
  getById: (id: string) => fetchHandler.get<Batch>(`/batches/${id}`),
  create: (data: Partial<Batch>) => fetchHandler.post<Batch>("/batches", data),
  update: (batchId: string, data: Partial<Batch>) => fetchHandler.put<Batch>(`/batches/${batchId}`, data),
  remove: (batchId: string) => fetchHandler.delete<Batch>(`/batches/${batchId}`),
};
