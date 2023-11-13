import React from "react";

interface IProps {
  children: React.ReactNode;
}

const TableColTitle = ({ children }: IProps) => {
  return <span className="text-green-500">{children}</span>;
};

export default TableColTitle;
