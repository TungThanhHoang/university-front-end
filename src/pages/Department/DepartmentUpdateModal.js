import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { updateDepartment, getDepartment } from "../Department/departmentSlice";
import { findDepartmentSelector } from "../../redux/selector";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@windmill/react-ui";
import DepartmentForms from "../../components/DepartmentForm/DepartmentForms";
import { unwrapResult } from "@reduxjs/toolkit";

function DepartmentUpdateModal({ isModalOpen, closeModal }) {
  const dispatch = useDispatch();
  const departmentRecord = useSelector(findDepartmentSelector);
  const [departmentForm, setDepartmentForm] = useState({
    id_dep: `${departmentRecord[0]?.id_dep}`,
    name_dep: `${departmentRecord[0]?.name_dep}`,
    id_code: `${departmentRecord[0]?.id_code}`,
    phone_dep: `${departmentRecord[0]?.phone_dep}`,
    descript_dep: `${departmentRecord[0]?.descript_dep}`,
  });
  console.log(departmentForm);
  const { name_dep, id_code, phone_dep, descript_dep } = departmentForm;
  const handleOnchange = (e) => {
    setDepartmentForm({
      ...departmentForm,
      [e.target.name]: e.target.value,
      flag: localStorage.getItem("flag").replace(/ /g, ""),
    });
  };

  const handleUpdate = async (event) => {
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
      const result = await dispatch(updateDepartment(departmentForm));
      const data = unwrapResult(result);
      await dispatch(getDepartment());
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

export default DepartmentUpdateModal;
