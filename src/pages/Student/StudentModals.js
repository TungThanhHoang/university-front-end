import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import studentSlice, { addStudent, getStudent, addQR } from "../Student/studentSlice";
import loginSlice, { registerAccountStudent } from "../Login/loginSlice";
import QRCode from "qrcode";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@windmill/react-ui";
import StudentForms from "../../components/StudentForm/StudentForm";
import { unwrapResult } from "@reduxjs/toolkit";

function StudentModals({ isModalOpen, closeModal, classUni }) {
  const dispatch = useDispatch();
  const [imgQR, setImgQR] = useState("hello word");
  const [studentForm, setStudentForm] = useState({
    id_student: "",
    name_student: "",
    gender_student: "",
    birthday_student: "",
    hometown_student: "",
    address_student: "",
    mobile_student: "",
    email_student: "",
  });
  const {
    name_student,
    gender_student,
    id_student,
    birthday_student,
    hometown_student,
    address_student,
    mobile_student,
    email_student,
  } = studentForm;

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

  const handleOnchange = (e) => {
    setStudentForm({
      ...studentForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      name_student === "" ||
      id_student === "" ||
      gender_student === "" ||
      birthday_student === "" ||
      hometown_student === "" ||
      address_student === "" ||
      mobile_student === "" ||
      email_student === ""
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
      const response = await dispatch(addStudent(studentForm));
      const result = unwrapResult(response);
      if (response.type === "student/addStudent/fulfilled") {
        await dispatch(addQR({ image_code: imgQR, id_student: id_student }));
        await dispatch(registerAccountStudent({ id_student: id_student, email_student: email_student, password: "123123", flag: email_student.split("@")[1].split(".")[0].toUpperCase() }));
        await dispatch(getStudent());
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
        setStudentForm("");
      }
    } catch (error) {
      console.log(error.msg);
      return toast.error(`${error.msg}`, {
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
            <StudentForms
              handleOnchange={handleOnchange}
              studentForm={studentForm}
              classUni={classUni}
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

export default StudentModals;
