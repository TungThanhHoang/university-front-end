import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { updateClass, getClass } from "../Class/classSlice";
import { findClassSelector } from "../../redux/selector";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@windmill/react-ui";
import ClassForms from "../../components/ClassForm/ClassForms";
import { unwrapResult } from "@reduxjs/toolkit";

function ClassUpdateModal({ isModalOpen, closeModal, major }) {
  const dispatch = useDispatch();
  const classRecord = useSelector(findClassSelector);
  const [classForm, setClassForm] = useState({
    id_class: `${classRecord[0]?.id_class.trim()}`,
    name_class: `${classRecord[0]?.name_class}`,
    id_major: `${classRecord[0]?.id_major}`,
    course: `${classRecord[0]?.course}`,
  });
  const { name_class, id_class, id_major, course } = classForm;
  const handleOnchange = (e) => {
    setClassForm({
      ...classForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (name_class === "" || id_major === "" || course === "")
      return toast.error("Hãy nhập đầy đủ thông tin!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    try {
      const result = await dispatch(updateClass(classForm));
      const data = unwrapResult(result);
      await dispatch(getClass());
      toast.success(`Cập nhật Thành công`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      closeModal();
    } catch (error) {
      toast.error(`${error}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <>
      <ToastContainer />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <form onSubmit={(e) => handleUpdate(e)}>
          <ModalBody>
            <ClassForms
              handleOnchange={handleOnchange}
              classForm={classForm}
              major={major}
            />
          </ModalBody>
          <ModalFooter>
            <div className="hidden sm:block">
              <Button layout="outline" onClick={closeModal}>
                Hủy bỏ
              </Button>
            </div>
            <div className="hidden sm:block">
              <Button type="submit">Lưu thay đổi</Button>
            </div>
            <div className="block w-full sm:hidden">
              <Button block size="large" layout="outline" onClick={closeModal}>
                Hủy bỏ
              </Button>
            </div>
            <div className="block w-full sm:hidden">
              <Button type="submit" block size="large">
                Lưu thay đổi
              </Button>
            </div>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}

export default ClassUpdateModal;
