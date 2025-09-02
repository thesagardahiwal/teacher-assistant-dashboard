'use client';

import { Form, Input, Select, FormInstance } from 'antd';
import React from 'react';
import { ClassroomFormValues } from '@/types/classroom';

const { Option } = Select;

interface ClassroomFormProps {
  form: FormInstance<ClassroomFormValues>;
  teachers: { _id: string; name: string }[];
  students: { _id: string; name: string }[];
}

const ClassroomForm: React.FC<ClassroomFormProps> = ({ form, teachers, students }) => {
  return (
    <Form form={form} layout="vertical">
      <Form.Item
        name="subject"
        label="Subject"
        rules={[{ required: true, message: 'Please input the subject!' }]}
      >
        <Input placeholder="e.g. Mathematics 101" />
      </Form.Item>

      <Form.Item
        name="teacher"
        label="Teacher"
        rules={[{ required: true, message: 'Please select a teacher!' }]}
      >
        <Select placeholder="Select teacher" showSearch optionFilterProp="children">
          {teachers.map(teacher => (
            <Option key={teacher._id} value={teacher._id}>
              {teacher.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="students" label="Students">
        <Select
          mode="multiple"
          placeholder="Select students"
          optionFilterProp="children"
          showSearch
          filterOption={(input, option) =>
            (option?.children as unknown as string)?.toLowerCase().includes(input.toLowerCase())
          }
        >
          {students.map(student => (
            <Option key={student._id} value={student._id}>
              {student.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};

export default ClassroomForm;