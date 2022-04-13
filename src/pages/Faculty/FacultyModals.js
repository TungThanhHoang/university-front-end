import React, { useState } from "react";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@windmill/react-ui";
import FacultyForms from "../../components/FacultyForm/FacultyForms";

function FacultyModals({ isModalOpen, closeModal }) {
  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalBody>
          <FacultyForms />
        </ModalBody>
        <ModalFooter>
          <div className="hidden sm:block">
            <Button layout="outline" onClick={closeModal}>
              Hủy bỏ
            </Button>
          </div>
          <div className="hidden sm:block">
            <Button>Lưu thay đổi</Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={closeModal}>
              Hủy bỏ
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large">
              Lưu thay đổi
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default FacultyModals;
