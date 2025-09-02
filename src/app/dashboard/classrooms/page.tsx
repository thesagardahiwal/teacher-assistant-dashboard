'use client';

import React, { useState, useEffect } from 'react';
import { Card, Button, Space, message, Input } from 'antd';
import { PlusOutlined, SearchOutlined, DownloadOutlined } from '@ant-design/icons';
import ClassroomService from '@/services/classroom';
import StudentService from '@/services/student';

import ClassroomTable from '@/components/ClassroomTable';
import ClassroomModal from '@/components/ClassroomModal';
import { Classroom, ClassroomFormValues } from '@/types/classroom';
import { useAuth } from '@/app/context/authProvider';

const { Search } = Input;

const ClassroomsPage: React.FC = () => {
  const { user } = useAuth();
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [filteredClassrooms, setFilteredClassrooms] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');

  // Current user (teacher) information
  const currentTeacher = user ? {
    _id: user._id,
    name: user.name || '',
    email: user.email || '',
    role: 'teacher'
  } : null;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = classrooms.filter(classroom =>
      classroom.subject.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredClassrooms(filtered);
  }, [searchText, classrooms]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [classroomsData, studentsData] = await Promise.all([
        ClassroomService.getAllClassrooms(),
        StudentService.getAllStudents(),
      ]);
      
      setClassrooms(classroomsData);
      setFilteredClassrooms(classroomsData);
      setStudents(studentsData);
    } catch (error) {
      console.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    if (!currentTeacher) {
      console.error('You must be logged in as a teacher to create a classroom');
      return;
    }
    setEditingId(null);
    setModalOpen(true);
  };

  const handleEdit = (record: Classroom) => {
    // Only allow editing if current user is the teacher of this classroom
    const teacherId = typeof record.teacher === 'object' ? record.teacher._id : record.teacher;
    if (teacherId !== currentTeacher?._id) {
      console.error('You can only edit your own classrooms');
      return;
    }
    setEditingId(record._id);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      // Verify the classroom belongs to current teacher before deleting
      const classroom = classrooms.find(c => c._id === id);
      if (!classroom) return;
      
      const teacherId = typeof classroom.teacher === 'object' ? classroom.teacher._id : classroom.teacher;
      if (teacherId !== currentTeacher?._id) {
        console.error('You can only delete your own classrooms');
        return;
      }

      await ClassroomService.deleteClassroom(id);
      message.success('Classroom deleted successfully');
      fetchData();
    } catch (error) {
      console.error('Failed to delete classroom');
    }
  };

  const handleSubmit = async (values: ClassroomFormValues) => {
    try {
      // Always use the current teacher's ID
      const payload = {
        ...values,
        teacher: currentTeacher?._id || ''
      };

      if (editingId) {
        await ClassroomService.updateClassroom(editingId, payload);
        message.success('Classroom updated successfully');
      } else {
        await ClassroomService.createClassroom(payload);
        message.success('Classroom created successfully');
      }
      fetchData();
    } catch (error) {
      console.error((error as Error).message || 'Operation failed');
      throw error;
    }
  };

  const handleExport = () => {
    message.info('Export functionality will be implemented');
  };

  return (
    <div className="classroom-page">
      <Card
        title="Classroom Management"
        extra={
          <Space>
            <Search
              placeholder="Search classrooms"
              allowClear
              enterButton={<SearchOutlined />}
              onSearch={value => setSearchText(value)}
              style={{ width: 250 }}
            />
            <Button 
              icon={<DownloadOutlined />} 
              onClick={handleExport}
            >
              Export
            </Button>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={handleCreate}
              disabled={!currentTeacher}
            >
              New Classroom
            </Button>
          </Space>
        }
      >
        <ClassroomTable
          data={filteredClassrooms}
          loading={loading}
          currentTeacherId={currentTeacher?._id}
          students={students}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Card>

      {currentTeacher && (
        <ClassroomModal
          open={modalOpen}
          title={editingId ? 'Edit Classroom' : 'Create Classroom'}
          teacherName={currentTeacher.name}
          students={students}
          initialValues={
            editingId 
              ? classrooms.find(c => c._id === editingId) as unknown as ClassroomFormValues 
              : undefined
          }
          onCancel={() => setModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default ClassroomsPage;