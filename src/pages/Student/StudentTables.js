import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import studentSlice, {
  getStudent,
  deleteStudent,
  updateStudent,
  findStudent,
} from "./studentSlice";
import { getClass } from "../Class/classSlice";
import notifyDeleteSlice from "../../components/NotifyDelete/notifyDeleteSlice";
import {
  getStudentSelector,
  getClassSelector,
  findStudentSelector,
  findIdStudentSelector,
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

function StudentTables() {
  const dispatch = useDispatch();
  const student = useSelector(getStudentSelector);
  const classUni = useSelector(getClassSelector);
  const studentRecord = useSelector(findStudentSelector);
  const studentId = useSelector(findIdStudentSelector);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdate, setIsModalUpdate] = useState(false);
  const [pageTable, setPageTable] = useState(1);
  const [dataTable, setDataTable] = useState([]);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function closeModalUpdate() {
    setIsModalUpdate(false);
    dispatch(studentSlice.actions.clearState());
  }

  useEffect(() => {
    Promise.all([dispatch(getStudent()), dispatch(getClass())]);
  }, []);

  useEffect(() => {
    setDataTable(
      student?.slice(
        (pageTable - 1) * resultsPerPage,
        pageTable * resultsPerPage
      )
    );
  }, [pageTable]);

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = student?.length;

  const onPageChangeTable = (p) => {
    setPageTable(p);
  };

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

  const handleConfirmDelete = async (id) => {
    try {
      const results = await dispatch(deleteStudent(id));
      const data = unwrapResult(results);
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
            <Button size="small" layout="link">Xem</Button>
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

      {studentId !== null && (
        <NotifyDelete
          handleConfirmDelete={handleConfirmDelete}
          handleCloseModal={handleCloseModal}
          id={studentId[0].id_student.replace(/ /g, "")}
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
