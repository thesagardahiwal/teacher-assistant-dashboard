'use client';

import { Table, Tag, Space, Button, Popconfirm, Typography } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Classroom, Student } from '@/types/classroom';
import type { TableProps } from 'antd';

const { Text } = Typography;

interface ClassroomTableProps {
  data: Classroom[];
  loading: boolean;
  currentTeacherId?: string;
  students: Student[];
  onEdit: (record: Classroom) => void;
  onDelete: (id: string) => void;
}

const ClassroomTable: React.FC<ClassroomTableProps> = ({
  data,
  loading,
  currentTeacherId,
  students,
  onEdit,
  onDelete,
}) => {
  const columns: TableProps<Classroom>['columns'] = [
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      sorter: (a, b) => a.subject.localeCompare(b.subject),
    },
    {
      title: 'Teacher',
      key: 'teacher',
      render: (_, record) => {
        const teacher = typeof record.teacher === 'object' ? record.teacher : { _id: record.teacher, name: 'Teacher' };
        return <Text strong={teacher._id === currentTeacherId}>{teacher.name}</Text>;
      },
    },
    {
      title: 'Students',
      key: 'students',
      render: (_, record) => (
        <Space size={[0, 8]} wrap>
          {record.students.map((s, i) => {
            const student = typeof s === 'object' ? s : students.find(st => st._id === s);
            return student ? (
              <Tag key={i}>{student.name}</Tag>
            ) : null;
          })}
        </Space>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      width: 120,
      render: (_, record) => {
        const teacherId = typeof record.teacher === 'object' ? record.teacher._id : record.teacher;
        const isOwnClassroom = teacherId === currentTeacherId;
        
        return (
          <Space size="middle">
            <Button 
              icon={<EditOutlined />} 
              onClick={() => onEdit(record)}
              disabled={!isOwnClassroom}
            />
            <Popconfirm
              title="Delete this classroom?"
              onConfirm={() => onDelete(record._id)}
              okText="Yes"
              cancelText="No"
              disabled={!isOwnClassroom}
            >
              <Button 
                danger 
                icon={<DeleteOutlined />} 
                disabled={!isOwnClassroom}
              />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="_id"
      loading={loading}
      pagination={{ pageSize: 10 }}
      bordered
      scroll={{ x: true }}
    />
  );
};

export default ClassroomTable;