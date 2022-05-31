import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { updateMajor, getMajor } from "../Major/majorSlice";
import { findMajorSelector } from "../../redux/selector";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@windmill/react-ui";
import MajorForms from "../../components/MajorForm/MajorForms";
import { unwrapResult } from "@reduxjs/toolkit";

function MajorUpdateModal({ isModalOpen, closeModal , faculty }) {
  const dispatch = useDispatch();
  const majorRecord = useSelector(findMajorSelector);
  const [majorForm, setMajorForm] = useState({
    id_major: `${majorRecord[0]?.id_major}`,
    name_major: `${majorRecord[0]?.name_major}`,
    id_fac: `${majorRecord[0]?.id_fac}`,
  });
  const { name_major ,id_major , id_fac} = majorForm;
  const handleOnchange = (e) => {
    setMajorForm({
      ...majorForm,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (
      name_major === "" || id_fac  === ""
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
      const result = await dispatch(updateMajor(majorForm));
      const data = unwrapResult(result);
      await dispatch(getMajor());
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
            <MajorForms
              handleOnchange={handleOnchange}
              majorForm={majorForm}
              faculty={faculty}
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

export default MajorUpdateModal;
