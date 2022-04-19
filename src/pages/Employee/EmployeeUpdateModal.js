import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { updateEmployee, getEmployee } from "../Employee/employeeSlice";
import { findEmployeeSelector } from "../../redux/selector";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@windmill/react-ui";
import EmployeeForms from "../../components/EmployeeForm/EmployeeForm";
import { unwrapResult } from "@reduxjs/toolkit";

function EmployeeUpdateModal({ isModalOpen, closeModal }) {
  const dispatch = useDispatch();
  const employeeRecord = useSelector(findEmployeeSelector);
  const [employeeForm, setEmployeeForm] = useState({
    id_emp: `${employeeRecord[0]?.id_emp}`,
    name_emp: `${employeeRecord[0]?.name_emp}`,
    gender_emp: `${employeeRecord[0]?.gender_emp}`,
    birthday_emp: `${employeeRecord[0]?.birthday_emp}`,
    hometown_emp: `${employeeRecord[0]?.hometown_emp}`,
    address_emp: `${employeeRecord[0]?.address_emp}`,
    mobile_emp: `${employeeRecord[0]?.mobile_emp}`,
    email_emp: `${employeeRecord[0]?.email_emp}`,
    name_emp: `${employeeRecord[0]?.name_job}`,
    name_academic: `${employeeRecord[0]?.name_academic}`,
  });
  const { id_academic ,  name_emp , gender_emp  } = employeeForm;
  const handleOnchange = (e) => {
    setEmployeeForm({
      ...employeeForm,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (
      name_emp === ""||
      gender_emp === "" 
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
      const result = await dispatch(updateEmployee(employeeForm));
      const data = unwrapResult(result);
      await dispatch(getEmployee());
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
            <EmployeeForms
              handleOnchange={handleOnchange}
              employeeorm={employeeForm}
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

export default EmployeeUpdateModal;
