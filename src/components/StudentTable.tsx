type Props = {
  students: any[];
  onEdit: (index: number, key: string, value: string) => void;
};

export default function StudentTable({ students, onEdit }: Props) {
  const headers = Object.keys(students[0] || {});

  return (
    <table className="w-full border border-gray-300 text-sm">
      <thead className="bg-gray-100">
        <tr>
          {headers.map((h) => (
            <th key={h} className="p-2 border">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {students.map((student, idx) => (
          <tr key={idx}>
            {headers.map((key) => (
              <td key={key} className="p-2 border">
                <input
                  type="text"
                  value={student[key]}
                  onChange={(e) => onEdit(idx, key, e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
