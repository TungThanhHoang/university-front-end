import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import employeeSlice, {
  addEmployee,
  getEmployee,
} from "../Employee/employeeSlice";
import { getAcademic } from "../Academic/academicSlice";
import { getJob } from "../Job/jobSlice";
import { getJobSelector, getAcademicSelector } from "../../redux/selector";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@windmill/react-ui";
import EmployeeForms from "../../components/EmployeeForm/EmployeeForm";
import { unwrapResult } from "@reduxjs/toolkit";

function EmployeeModals({ isModalOpen, closeModal }) {
  const dispatch = useDispatch();
  const job = useSelector(getJobSelector);
  const academic = useSelector(getAcademicSelector);
  const [employeeForm, setEmployeeForm] = useState({
    id_emp: "",
    name_emp: "",
    gender_emp: "",
    birthday_emp: "",
    hometown_emp: "",
    address_emp: "",
    mobile_emp: "",
    email_emp: "",
    id_job: "",
    id_academic: "",
  });
  const {
    name_emp,
    gender_emp,
    id_emp,
    birthday_emp,
    hometown_emp,
    address_emp,
    mobile_emp,
    email_emp,
    id_job,
    id_academic,
  } = employeeForm;

  useEffect(() => {
    Promise.all([dispatch(getAcademic()), dispatch(getJob())]);
  }, []);
  const handleOnchange = (e) => {
    setEmployeeForm({
      ...employeeForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      name_emp === "" ||
      id_emp === "" ||
      gender_emp === "" ||
      birthday_emp === "" ||
      hometown_emp === "" ||
      address_emp === "" ||
      mobile_emp === "" ||
      email_emp === "" ||
      id_job === "" ||
      id_academic === ""
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
      const result = await dispatch(addEmployee(employeeForm));
      const data = unwrapResult(result);
      await dispatch(getEmployee());
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
      setEmployeeForm("");
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
            <EmployeeForms
              handleOnchange={handleOnchange}
              employeeForm={employeeForm}
              job={job}
              academic={academic}
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

export default EmployeeModals;
