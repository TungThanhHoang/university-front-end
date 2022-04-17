import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { updateFaculty, getFaculty } from "../Faculty/facultySlice";
import { findFacultySelector } from "../../redux/selector";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@windmill/react-ui";
import FacultyForms from "../../components/FacultyForm/FacultyForms";
import { unwrapResult } from "@reduxjs/toolkit";

function FacultyUpdateModal({ isModalOpen, closeModal }) {
  const dispatch = useDispatch();
  const facultyRecord = useSelector(findFacultySelector);
  const [facultyForm, setFacultyForm] = useState({
    id_fac: `${facultyRecord[0]?.id_fac}`,
    name_fac: `${facultyRecord[0]?.name_fac}`,
    id_code: `${facultyRecord[0]?.id_code}`,
    phone_fac: `${facultyRecord[0]?.phone_fac}`,
    descipt_fac: `${facultyRecord[0]?.descipt_fac}`,
  });
  console.log(facultyForm);
  const { name_fac, id_code, phone_fac, descipt_fac } = facultyForm;
  const handleOnchange = (e) => {
    setFacultyForm({
      ...facultyForm,
      [e.target.name]: e.target.value,
      flag: localStorage.getItem("flag").replace(/ /g, ""),
    });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (
      name_fac === "" ||
      phone_fac === "" ||
      id_code === "" ||
      descipt_fac === ""
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
      const result = await dispatch(updateFaculty(facultyForm));
      const data = unwrapResult(result);
      await dispatch(getFaculty());
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
            <FacultyForms
              handleOnchange={handleOnchange}
              facultyForm={facultyForm}
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

export default FacultyUpdateModal;
