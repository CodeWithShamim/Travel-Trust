"use client";

import { Button, Drawer, Input, Table } from "antd";
import { useState } from "react";
import { BiFilter } from "react-icons/bi";
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
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  isButton?: boolean;
  onClickBtn?: () => void;
  isTitleBtn?: boolean;
  onAdd?: () => void;
  type: string;
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
  searchTerm,
  setSearchTerm,
  isButton = false,
  onClickBtn,
  isTitleBtn = false,
  onAdd,
  type,
}: UMTableProps) => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

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
    <>
      <div className="bg-white mb-6 p-2 rounded flex items-center justify-between">
        <Input
          placeholder="Search"
          type="text"
          allowClear
          className="text-black lg:w-[40%] h-16 rounded-md border-neutral-200 z-50"
          style={{ width: Number(window?.innerWidth) - 118 }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex items-center cursor-pointer z-50">
          <h4>{`Filter`}</h4>
          <Button
            size="small"
            className="border-0"
            onClick={() => setDrawerOpen(true)}
            icon={<BiFilter size={26} className="text-green-400" />}
          />
        </div>

        <div className="w-[90%] absolute right-0 top-0 bottom-0">
          <Drawer
            title="Filters"
            placement="right"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            {/* <FilterSideBar
              setStatus={setStatus}
              setPrices={setPrices}
              setLocation={setLocation}
              setCategory={setCategory}
            /> */}
          </Drawer>
        </div>
      </div>

      <Table
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        pagination={paginationConfig}
        onChange={onTableChange}
        style={{
          overflowX: "auto",
          width: Number(window?.innerWidth) - 118,
          backgroundColor: "white",
        }}
        title={() =>
          isButton ? (
            <Button onClick={onClickBtn} type="primary" size="middle">
              Save Changes
            </Button>
          ) : isTitleBtn ? (
            <div className="flex items-center justify-between">
              <h1 className="text-green-400 font-bold text-xl">
                Manage {type}
              </h1>
              <Button onClick={onAdd} type="primary">
                Add
              </Button>
            </div>
          ) : (
            <h1 className="text-green-400 font-bold text-xl">Manage {type}</h1>
          )
        }
        //
      />
    </>
  );
};

export default TTTable;
