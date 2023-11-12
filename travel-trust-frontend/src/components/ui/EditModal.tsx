import { Modal } from "antd";
import React, { ReactNode } from "react";

interface IEditModal {
  open: boolean;
  title?: string;
  onCancel: () => void;
  children?: ReactNode;
}

const EditModal = ({
  open,
  title = "Edit",
  onCancel,
  children,
}: IEditModal) => {
  return (
    <Modal title={title} open={open} onCancel={onCancel} footer={null}>
      {children}
    </Modal>
  );
};

export default EditModal;
