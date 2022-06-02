import React, { useState } from "react";
import { useDispatch , useSelector} from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import facultySlice, {
  addFaculty,
  getFaculty,
  findFacultyView,
  updateEmployeePositionFaculty,
} from "../Faculty/facultySlice";
import { getEmployeePositionFaculty } from "../Employee/employeeSlice";
import {findIdFacultyViewSelector} from '../../redux/selector'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@windmill/react-ui";
import FacultyForms from "../../components/FacultyForm/FacultyForms";
import { unwrapResult } from "@reduxjs/toolkit";
import FacultyFormAddEmp from "../../components/FacultyForm/FacultyFormAddEmp";

function FacultyModalAddEmploy({
  isModalOpen,
  closeModal,
  id,
  handleOnchange,
  formPositionFaculty,
}) {
  const dispatch = useDispatch();
  const idFacultyView = useSelector(findIdFacultyViewSelector);
  const { id_emp, id_pos_fac } = formPositionFaculty;
  const submitChange = async (event) => {
    event.preventDefault();
    if (id_emp === "" || id_pos_fac === "") {
      return toast.error(`Các trường không được để trống`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    try {
      await dispatch(
        updateEmployeePositionFaculty({
          id_emp: id_emp.trim(),
          id_pos_fac: id_pos_fac,
        })
      );
      await dispatch(findFacultyView(idFacultyView[0]?.id_fac));
      closeModal();
      toast.success(`Thêm Thành công`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error);
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
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center appear-done enter-done">
          <div className=" w-full px-6 py-4 overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-3xl appear-done enter-done">
            <form onSubmit={(e) => submitChange(e)}>
              <ModalBody>
                <FacultyFormAddEmp handleOnchange={handleOnchange} />
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
                  <Button
                    block
                    size="large"
                    layout="outline"
                    onClick={closeModal}
                  >
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
          </div>
        </div>
      )}
    </>
  );
}

export default FacultyModalAddEmploy;
