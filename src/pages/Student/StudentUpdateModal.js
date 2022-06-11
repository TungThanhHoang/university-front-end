import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { updateStudent, getStudent, updateQR } from "../Student/studentSlice";
import { findStudentSelector } from "../../redux/selector";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@windmill/react-ui";
import StudentForms from "../../components/StudentForm/StudentForm";
import { unwrapResult } from "@reduxjs/toolkit";
import QRCode from "qrcode";


function StudentUpdateModal({ isModalOpen, closeModal, classUni }) {
  const dispatch = useDispatch();
  const studentRecord = useSelector(findStudentSelector);
  const [studentForm, setStudentForm] = useState({
    id_student: `${studentRecord[0]?.id_student.trim()}`,
    name_student: `${studentRecord[0]?.name_student}`,
    gender_student: `${studentRecord[0]?.gender_student.trim()}`,
    birthday_student: `${studentRecord[0]?.birthday_student}`,
    hometown_student: `${studentRecord[0]?.hometown_student}`,
    address_student: `${studentRecord[0]?.address_student}`,
    mobile_student: `${studentRecord[0]?.mobile_student}`,
    email_student: `${studentRecord[0]?.email_student}`,
    id_class: `${studentRecord[0]?.id_class}`,
    id_qr: `${studentRecord[0]?.id_qr}`,
  });
  const [imgQR, setImgQR] = useState("hello word");
  
  const { id_student, id_class, name_student, gender_student } = studentForm;
  const handleOnchange = (e) => {
    setStudentForm({
      ...studentForm,
      [e.target.name]: e.target.value,
    });
  };

  let opts = {
    errorCorrectionLevel: "Q",
    width: 256,
    height: 256,
  };

  QRCode.toString(
    JSON.stringify(
      studentForm
    ),
    opts
  )
    .then((res) => {
      setImgQR(res);
    })
    .catch((err) => {
      console.error(err);
    });

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (name_student === "" || gender_student === "" || id_class === "")
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
      await dispatch(updateStudent(studentForm));
      await dispatch(updateQR({ id_qr: studentRecord[0]?.id_qr, image_code: imgQR }));
      await dispatch(getStudent());
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
      toast.error(`${error.msg}`, {
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
            <StudentForms
              handleOnchange={handleOnchange}
              studentForm={studentForm}
              classUni={classUni}
              disableId={true}
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

export default StudentUpdateModal;
