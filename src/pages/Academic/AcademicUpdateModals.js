import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { updateAcademic, getAcademic } from "../Academic/academicSlice";
import { findAcademicSelector } from "../../redux/selector";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@windmill/react-ui";
import AcademicForms from "../../components/AcademicForm/AcademicForms";
import { unwrapResult } from "@reduxjs/toolkit";

function AcademicUpdateModal({ isModalOpen, closeModal }) {
  const dispatch = useDispatch();
  const academicRecord = useSelector(findAcademicSelector);
  const [academicForm, setAcademicForm] = useState({
    id_academic: `${academicRecord[0]?.id_academic}`,
    name_academic: `${academicRecord[0]?.name_academic}`,
    code_academic: `${academicRecord[0]?.code_academic}`,
  });
  const { id_academic ,  name_academic , code_academic } = academicForm;
  const handleOnchange = (e) => {
    setAcademicForm({
      ...academicForm,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (
      name_academic === ""||
      code_academic === "" 
    )
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
      const result = await dispatch(updateAcademic(academicForm));
      const data = unwrapResult(result);
      await dispatch(getAcademic());
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
      console.log(data);
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
            <AcademicForms
              handleOnchange={handleOnchange}
              academicForm={academicForm}
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

export default AcademicUpdateModal;
