import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { findIdFacultyViewSelector } from "../../redux/selector";
import classSlice, { addGpaStudent, findGpaStudent } from "../Class/classSlice";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@windmill/react-ui";
import GpaForms from "../../components/ClassForm/GpaForm";

function GpaStudentModalAdd({ isModalAddGpa, closeModal, id }) {
  const dispatch = useDispatch();
  const [gpaForm, setGpaForm] = useState({
    name_term: "",
    grade_gpa: 0,
    id_student: id,
    year_gpa:2021
  });
  const handleOnchange = (e) => {
    setGpaForm({ ...gpaForm, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     await dispatch(addGpaStudent({ name_term:gpaForm.name_term , grade_gpa: Number(gpaForm.grade_gpa), id_student: gpaForm.id_student , year_gpa: gpaForm.year_gpa}));
     await dispatch(findGpaStudent(id));
      closeModal();
    } catch (error) {}
  };
  return (
    <>
      <ToastContainer />
      {isModalAddGpa && (
        <div className="fixed inset-0 z-50 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center appear-done enter-done">
          <div className=" w-full px-6 py-4 overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-2xl appear-done enter-done">
            <form onSubmit={(e) => handleSubmit(e)}>
              <ModalBody>
                <div className="flex justify-between mb-5">
                  <div className="capitalize font-semibold text-lg">
                    Điểm tổng kết
                  </div>
                </div>
                <GpaForms gpaForm={gpaForm} handleOnchange={handleOnchange} />
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

export default GpaStudentModalAdd;
