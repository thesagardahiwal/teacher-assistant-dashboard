'use client';

import { Modal, Button, Form, Select, Space, Typography, Input } from 'antd';
import React from 'react';
import { ClassroomFormValues, Student } from '@/types/classroom';

const { Option } = Select;
const { Text } = Typography;

interface ClassroomModalProps {
  open: boolean;
  title: string;
  teacherName: string;
  students: Student[];
  initialValues?: ClassroomFormValues;
  onCancel: () => void;
  onSubmit: (values: ClassroomFormValues) => Promise<void>;
}

const ClassroomModal: React.FC<ClassroomModalProps> = ({
  open,
  title,
  teacherName,
  students,
  initialValues,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm<ClassroomFormValues>();
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  React.useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleOk = async () => {
    try {
      setConfirmLoading(true);
      const values = await form.validateFields();
      await onSubmit(values);
      onCancel();
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <Modal
      title={title}
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      width={600}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button 
          key="submit" 
          type="primary" 
          loading={confirmLoading} 
          onClick={handleOk}
        >
          Submit
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="subject"
          label="Subject"
          rules={[{ required: true, message: 'Please input the subject!' }]}
        >
          <Input placeholder="e.g. Mathematics 101" />
        </Form.Item>

        <Space direction="vertical" style={{ marginBottom: 16 }}>
          <Text strong>Teacher:</Text>
          <Text>{teacherName}</Text>
        </Space>

        <Form.Item
          name="students"
          label="Students"
        >
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
                {student.name} ({student.rollNumber})
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ClassroomModal;