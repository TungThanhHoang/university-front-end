import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter , Button } from "@windmill/react-ui";
import { useDispatch , useSelector} from "react-redux";
import { notifyDeleteSelector } from '../../redux/selector'
import  notifyDeleteSlice from './notifyDeleteSlice';
function NotifyDelete({ handleConfirmDelete , handleCloseModal , id ,idQR}) {
  const isModalOpen = useSelector(notifyDeleteSelector)
  console.log(id);
  return (
    <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
      <ModalBody>
      Bạn có chắc chắn muốn xóa không?
      </ModalBody>
      <ModalFooter>
        <Button
          className="w-full sm:w-auto"
          layout="outline"
          onClick={handleCloseModal}
        >
          Hủy bỏ
        </Button>
        <Button id={id} className="w-full sm:w-auto" onClick={() => handleConfirmDelete(id ,idQR)}>Đồng ý</Button>
      </ModalFooter>
    </Modal>
  );
}

export default NotifyDelete;
