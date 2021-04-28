import React from "react";
import { Modal } from "react-bootstrap";
import "./FileModal.css";

export interface FileModalProps {
  show: boolean;
  onHide: Function;
}

export const FileModal: React.FC<FileModalProps> = (props) => {
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="file-modal"
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="text-dark">
          <h4>Your thumbnails 🙌</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
    </Modal>
  );
};
