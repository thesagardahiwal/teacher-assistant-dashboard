"use client";

export default function StudentFilters() {
  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Search by name/roll"
        className="border rounded px-3 py-1"
      />
      <select className="border rounded px-3 py-1">
        <option>All Batches</option>
        <option>Batch A</option>
        <option>Batch B</option>
      </select>
    </div>
  );
}
