"use client";

import { useEffect } from "react";
import { useApi } from "@/hooks/useApi";
import { studentService } from "@/services";
import StudentTable from "./StudentTable";
import StudentFilters from "./StudentFilters";
import StudentImportModal from "./StudentImportModal";
import StudentExportButton from "./StudentExportButton";
import ApiLoader from "../ApiLoader";

export default function StudentList() {
  const { data: students, loading, error, execute } = useApi(studentService.getAll);

//   useEffect(() => {
//     execute();
//   }, [execute]);

  return (
    <div>
      {/* Header Controls */}
      <div className="flex items-center justify-between mb-4">
        <StudentFilters />
        <div className="flex gap-2">
          <StudentImportModal onImported={execute} />
          <StudentExportButton students={students || []} />
        </div>
      </div>

      {/* Table */}
      <ApiLoader loading={loading} error={error}>
        <StudentTable students={students || []} onRefresh={execute} />
      </ApiLoader>
    </div>
  );
}
