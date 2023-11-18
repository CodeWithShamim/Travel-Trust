"use client";

import { Button, Table } from "antd";
import { FaRegEdit } from "react-icons/fa";

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
  isTitleBtn?: boolean;
  onAdd?: () => void;
  onEdit?: () => void;
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
  isTitleBtn = false,
  onAdd,
  onEdit,
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
        ) : isTitleBtn ? (
          <div className="flex items-center justify-between">
            <h1 className="text-green-400 font-bold text-xl">Manage</h1>
            <div className="flex items-center gap-2">
              <Button onClick={onAdd} type="primary">
                Add
              </Button>
              <Button
                onClick={onEdit}
                type="primary"
                icon={<FaRegEdit className="text-white cursor-pointer" />}
              >
                Edit
              </Button>
            </div>
          </div>
        ) : (
          <h1 className="text-green-400 font-bold text-xl">Manage</h1>
        )
      }
      //
    />
  );
};

export default TTTable;
