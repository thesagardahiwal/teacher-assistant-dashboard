'use client';

import { Button, Dropdown, MenuProps, message } from 'antd';
import { DeleteOutlined, DownloadOutlined } from '@ant-design/icons';

interface BulkActionsProps {
  selectedRows: any[];
  onDelete: (ids: string[]) => void;
  onExport: (data: any[]) => void;
}

const BulkActions: React.FC<BulkActionsProps> = ({ selectedRows, onDelete, onExport }) => {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Delete Selected',
      icon: <DeleteOutlined />,
      onClick: () => {
        onDelete(selectedRows.map(row => row._id));
      },
    },
    {
      key: '2',
      label: 'Export Selected',
      icon: <DownloadOutlined />,
      onClick: () => {
        onExport(selectedRows);
      },
    },
  ];

  return (
    <Dropdown menu={{ items }} disabled={selectedRows.length === 0}>
      <Button>
        Bulk Actions ({selectedRows.length})
      </Button>
    </Dropdown>
  );
};

export default BulkActions;