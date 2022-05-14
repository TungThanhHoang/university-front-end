import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
  updateMemUniversity,
  getMemUniversity
} from "../MemberUniversity/memberUniversitySlice";
import { findMemUniversitySelector } from "../../redux/selector";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@windmill/react-ui";
import MemberUniversityForm from "../../components/MemberUniversityForm/MemberUniversityForms";
import { unwrapResult } from "@reduxjs/toolkit";

function MemberUniversityUpdateModal({ isModalOpen, closeModal }) {
  const dispatch = useDispatch();
  const memUniRecord = useSelector(findMemUniversitySelector);
  const [memUniForm, setMemUniForm] = useState({
    id_uni: `${memUniRecord[0]?.id_uni.trim()}`,
    name_vn_uni: `${memUniRecord[0]?.name_vn_uni}`,
    name_en_uni: `${memUniRecord[0]?.name_en_uni}`,
    address_uni: `${memUniRecord[0]?.address_uni}`,
    phone_uni: `${memUniRecord[0]?.phone_uni}`,
    website_uni: `${memUniRecord[0]?.website_uni}`,
    img_uni: `${memUniRecord[0]?.img_uni}`,
  });

  const {
    id_uni,
    name_vn_uni,
    name_en_uni,
    phone_uni,
    address_uni,
    img_uni,
    website_uni,
  } = memUniForm;
  const handleOnchange = (e) => {
    setMemUniForm({
      ...memUniForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (name_vn_uni === "" || address_uni === "" || phone_uni === "" )
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
      const result = await dispatch(updateMemUniversity(memUniForm));
      const data = unwrapResult(result);
      await dispatch(getMemUniversity());
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
            <MemberUniversityForm
              handleOnchange={handleOnchange}
              memUniForm={memUniForm}
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

export default MemberUniversityUpdateModal;
