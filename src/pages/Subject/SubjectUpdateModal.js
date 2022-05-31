import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { updateSubject, getSubject } from "../Subject/subjectSlice";
import { findSubjectSelector } from "../../redux/selector";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@windmill/react-ui";
import SubjectForms from "../../components/SubjectForm/SubjectForms";
import { unwrapResult } from "@reduxjs/toolkit";

function SubjectUpdateModal({ isModalOpen, closeModal , faculty }) {
  const dispatch = useDispatch();
  const subjectRecord = useSelector(findSubjectSelector);
  const [subjectForm, setSubjectForm] = useState({
    id_subject: `${subjectRecord[0]?.id_subject}`,
    name_subject: `${subjectRecord[0]?.name_subject}`,
    code_subject: `${subjectRecord[0]?.code_subject}`,
    credit_subject: `${subjectRecord[0]?.credit_subject}`,
    id_fac: `${subjectRecord[0]?.id_fac}`
  });
  const { name_major ,id_subject , code_subject, credit_subject ,id_fac} = subjectForm;
  const handleOnchange = (e) => {
    setSubjectForm({
      ...subjectForm,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (
      name_major === "" || id_fac  === "" || code_subject === "" || credit_subject === ""
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
      const result = await dispatch(updateSubject(subjectForm));
      const data = unwrapResult(result);
      await dispatch(getSubject());
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

export default SubjectUpdateModal;
