"use client";

import { Button, Table } from "antd";

type UMTableProps = {
  loading?: boolean;
  columns: any;
  dataSource: any;
  pageSize?: number;
  totalPages?: number;
  showSizeChanger?: boolean;
  onPaginationChange?: (page: number, pageSize: number) => void;
  onTableChange?: (pagination: any, filter: any, sorter: any) => void;
  showPagination?: boolean;
  isButton?: boolean;
  onClickBtn?: () => void;
};

const TTTable = ({
  loading = false,
  columns,
  dataSource,
  pageSize,
  totalPages,
  showSizeChanger = true,
  onPaginationChange,
  onTableChange,
  showPagination = true,
  isButton = false,
  onClickBtn,
}: UMTableProps) => {
  const paginationConfig = showPagination
    ? {
        pageSize: pageSize,
        total: totalPages,
        pageSizeOptions: [5, 10, 20],
        showSizeChanger: showSizeChanger,
        onChange: onPaginationChange,
      }
    : false;

  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={dataSource}
      pagination={paginationConfig}
      onChange={onTableChange}
      style={{ overflowX: "auto", width: Number(window?.innerWidth) - 118 }}
      title={() =>
        isButton ? (
          <Button onClick={onClickBtn} type="primary" size="middle">
            Save Changes
          </Button>
        ) : (
          <h1 className="text-green-400 font-bold text-xl">Manage</h1>
        )
      }
      //
    />
  );
};

export default TTTable;
