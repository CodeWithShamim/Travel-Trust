import { Modal } from "antd";
import React, { ReactNode } from "react";

interface IEditModal {
  open: boolean;
  title?: string;
  onOk: () => void;
  onCancel: () => void;
  children?: ReactNode;
}

const EditModal = ({
  open,
  title = "Edit",
  onOk,
  onCancel,
  children,
}: IEditModal) => {
  return (
    <Modal title={title} open={open} onOk={onOk} onCancel={onCancel}>
      {children}
    </Modal>
  );
};

export default EditModal;
