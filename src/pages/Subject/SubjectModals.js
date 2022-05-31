import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import subjectSlice ,{ addSubject, getSubject } from "../Subject/subjectSlice";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@windmill/react-ui";
import SubjectForms from "../../components/SubjectForm/SubjectForms";
import { unwrapResult } from "@reduxjs/toolkit";

function SubjectModals({ isModalOpen, closeModal , faculty }) {
  const dispatch = useDispatch();
  const [subjectForm, setSubjectForm] = useState({
    name_subject: "",
    id_fac: "",
  });
  const { name_subject,  id_fac } = subjectForm;

  const handleOnchange = (e) => {
    setSubjectForm({
      ...subjectForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      name_subject === "" || id_fac  === ""
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
      const result = await dispatch(addSubject(subjectForm));
      const data = unwrapResult(result);
      await dispatch(getSubject());
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
      setSubjectForm("")
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
            <SubjectForms
              handleOnchange={handleOnchange}
              subjectForm={subjectForm}
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

export default SubjectModals;
