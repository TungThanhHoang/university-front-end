import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import departmentSlice ,{ addDepartment, getDepartment } from "../Department/departmentSlice";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@windmill/react-ui";
import DepartmentForms from "../../components/DepartmentForm/DepartmentForms";
import { unwrapResult } from "@reduxjs/toolkit";

function DepartmentModals({ isModalOpen, closeModal }) {
  const dispatch = useDispatch();
  const [departmentForm, setDepartmentForm] = useState({
    name_dep: "",
    id_code: "",
    phone_dep: "",
    descript_dep: "",
  });
  const { name_dep, id_code, phone_dep, descript_dep } = departmentForm;

  const handleOnchange = (e) => {
    setDepartmentForm({
      ...departmentForm,
      [e.target.name]: e.target.value,
      flag: localStorage.getItem("flag").replace(/ /g, ""),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      name_dep === "" ||
      phone_dep === "" ||
      id_code === "" ||
      descript_dep === ""
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
      const result = await dispatch(addDepartment(departmentForm));
      const data = unwrapResult(result);
      await dispatch(getDepartment());
      toast.success(`Thêm Thành công`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      closeModal();
      setDepartmentForm("")
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
        <form onSubmit={(e) => handleSubmit(e)}>
          <ModalBody>
            <DepartmentForms
              handleOnchange={handleOnchange}
              departmentForm={departmentForm}
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

export default DepartmentModals;
