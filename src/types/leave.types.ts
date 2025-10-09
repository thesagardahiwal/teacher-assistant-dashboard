export interface ILeave {
  teacher: string;
  startDate: Date;
  endDate: Date;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
  approvedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}
