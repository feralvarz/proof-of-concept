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
        <Modal.Title id="contained-modal-title-vcenter">
          Your thumbnails
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
    </Modal>
  );
};
