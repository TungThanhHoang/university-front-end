import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import studentSlice, {
  getStudent,
  deleteStudent,
  updateStudent,
  findStudent,
  findQRStudent,
  deleteQR
} from "./studentSlice";
import { getClass } from "../Class/classSlice";
import notifyDeleteSlice from "../../components/NotifyDelete/notifyDeleteSlice";
import {
  getStudentSelector,
  getClassSelector,
  findStudentSelector,
  findIdStudentSelector,
  getQRSelector
} from "../../redux/selector";
import PageTitle from "../../components/Typography/PageTitle";
import {
  Avatar,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Button,
  Pagination,
} from "@windmill/react-ui";
import { Table } from "antd";
import StudentModals from "../Student/StudentModals";
import StudentUpdateModals from "../Student/StudentUpdateModal";
import { unwrapResult } from "@reduxjs/toolkit";
import NotifyDelete from "../../components/NotifyDelete/NotifyDelete";
import ActionTable from "../../components/ActionTable";
import StudentQRModal from "./StudentQRModal";

function StudentTables() {
  const dispatch = useDispatch();
  const student = useSelector(getStudentSelector);
  const classUni = useSelector(getClassSelector);
  const studentRecord = useSelector(findStudentSelector);
  const studentId = useSelector(findIdStudentSelector);
  const qrCode = useSelector(getQRSelector);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdate, setIsModalUpdate] = useState(false);
  const [isModalQR, setISModalQR] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }
  function openModaQR(id) {
    dispatch(studentSlice.actions.findQRStudent(id.trim()))
    setISModalQR(true);
  }

  function closeModalQR() {
    dispatch(studentSlice.actions.clearState());
    setISModalQR(false);
  }

  function closeModalUpdate() {
    setIsModalUpdate(false);
    dispatch(studentSlice.actions.clearState());
  }

  useEffect(() => {
    Promise.all([dispatch(getStudent()), dispatch(getClass())]);
  }, []);

  const openModalUpdate = async (id) => {
    try {
      const result = await dispatch(findStudent(id.replace(/ /g, "")));
      const data = unwrapResult(result);
      // dispatch(facultySlice.actions.updateFacultyAction(id));
      console.log(data);
      if (data) {
        setIsModalUpdate(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openModalDelete = (id) => {
    dispatch(studentSlice.actions.findIdDelete(id.replace(/ /g, "")));
    dispatch(notifyDeleteSlice.actions.open());
  };

  const handleCloseModal = () => {
    dispatch(notifyDeleteSlice.actions.close());
  };

  const formatDate = (birthday) => {
    let data = new Date(birthday);
    return data.toLocaleDateString();
  };

  const handleConfirmDelete = async (id, idQR) => {
    try {
      await dispatch(deleteStudent(id));
      await dispatch(deleteQR(idQR));
      await dispatch(studentSlice.actions.deleteStudentAction(id));
      handleCloseModal();
      toast.success(`Xóa Thành công`, {
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

  const columns = [
    {
      title: "STT",
      key: "stt",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Học sinh",
      dataIndex: "name_student",
      key: "name_student",
      render: (_, item) => {
        return (
          <>
            <div className="flex items-center text-sm">
              <Avatar
                src="https://res.cloudinary.com/i-h-c-n-ng/image/upload/v1649606919/avatar_4_otwwto.png"
                alt="Judith"
              />
              <div className="ml-3">
                <p className="font-semibold ">{item.name_student}</p>
                <p className="text-xs">{item.id_student}</p>
              </div>
            </div>
          </>
        );
      },
    },
    {
      title: "Giới tính",
      dataIndex: "gender_student",
      key: "gender_student",
      render: (_, item) => {
        return (
          <>
            <p className="capitalize">{item.gender_student}</p>
          </>
        );
      },
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthday_student",
      key: "birthday_student",
      render: (_, item) => {
        return (
          <>
            <p className="">{formatDate(item.birthday_student)}</p>
          </>
        );
      },
    },
    {
      title: "Liên lạc",
      dataIndex: "mobile_student",
      key: "hotile",
      render: (_, item) => {
        return (
          <>
            <p className="">0{item.mobile_student}</p>
            <p className=" ">{item.email_student}</p>
            <p className=" ">{item.name_class}</p>
          </>
        );
      },
    },
    {
      title: "Chuyên ngành",
      dataIndex: "name_major",
      key: "name_major",
    },
    {
      title: "Quê quán",
      dataIndex: "hometown_student",
      key: "hometown_student",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address_student",
      key: "address_student",
    },
    {
      title: "Mã QR",
      dataIndex: "image_qr",
      key: "image_qr",
      render: (_, item) => {
        return (
          <>
            <Button size="small" layout="link" onClick={() => openModaQR(item.id_student?.trim())} >Xem</Button>
          </>
        );
      },
    },
    {
      title: "Liên lạc",
      dataIndex: "mobile_student",
      key: "hotile",
      render: (_, item) => {
        return (
          <>
            <ActionTable
              openModalUpdate={openModalUpdate}
              openModalDelete={openModalDelete}
              id={item.id_student.trim()}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <ToastContainer />
      <PageTitle>
        <div className="flex justify-between">
          <div>Sinh viên</div>
          <Button onClick={openModal}>Thêm sinh viên</Button>
        </div>
      </PageTitle>
      { qrCode !== null && <StudentQRModal isModalOpen={isModalQR} closeModal={closeModalQR} /> }
      {studentId !== null && (
        <NotifyDelete
          handleConfirmDelete={handleConfirmDelete}
          handleCloseModal={handleCloseModal}
          id={studentId[0].id_student.replace(/ /g, "")}
          idQR={studentId[0]?.id_qr}
        />
      )}
      <StudentModals
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        classUni={classUni}
      />
      {studentRecord !== null && (
        <StudentUpdateModals
          isModalOpen={isModalUpdate}
          openModalUpdate={openModalUpdate}
          closeModal={closeModalUpdate}
          classUni={classUni}
        />
      )}

      <Table
        className="p-0 dark:bg-gray-80"
        keyRow="id"
        dataSource={student}
        columns={columns}
        pagination={{ pageSize: 10 }}
      />
    </>
  );
}

export default StudentTables;
