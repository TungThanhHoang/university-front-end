import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import subjectSlice, {
  getSubject,
  deleteSubject,
  updateSubject,
  findSubject,
} from "./subjectSlice";
import notifyDeleteSlice from "../../components/NotifyDelete/notifyDeleteSlice";
import {
  getFacultySelector,
  getSubjectSelector,
  notifyDeleteSelector,
  findSubjectSelector,
  findIdSubjectSelector,
} from "../../redux/selector";
import PageTitle from "../../components/Typography/PageTitle";
import {
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

import SubjectModals from "../Subject/SubjectModals";
import SubjectUpdateModals from "../Subject/SubjectUpdateModal";
import { unwrapResult } from "@reduxjs/toolkit";
import NotifyDelete from "../../components/NotifyDelete/NotifyDelete";
import ActionTable from "../../components/ActionTable";
import { getFaculty } from "../Faculty/facultySlice";

function SubjectTables() {
  const dispatch = useDispatch();
  const subject = useSelector(getSubjectSelector);
  const subjectRecord = useSelector(findSubjectSelector);
  const subjectId = useSelector(findIdSubjectSelector);
  const faculty = useSelector(getFacultySelector);

  const response = subject?.concat([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdate, setIsModalUpdate] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function closeModalUpdate() {
    setIsModalUpdate(false);
    dispatch(subjectSlice.actions.clearState());
  }

  const [pageTable, setPageTable] = useState(1);

  const [dataTable, setDataTable] = useState([]);

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = response?.length;

  useEffect(() => {
    Promise.all([dispatch(getSubject()), dispatch(getFaculty())]);
  }, []);

  useEffect(() => {
    setDataTable(
      response?.slice(
        (pageTable - 1) * resultsPerPage,
        pageTable * resultsPerPage
      )
    );
  }, [pageTable]);

  const onPageChangeTable = (p) => {
    setPageTable(p);
  };

  const openModalUpdate = async (id) => {
    try {
      const result = await dispatch(findSubject(id));
      const data = unwrapResult(result);
      // dispatch(facultySlice.actions.updateFacultyAction(id));
      if (data) {
        setIsModalUpdate(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openModalDelete = (id) => {
    dispatch(subjectSlice.actions.findIdDelete(id));
    dispatch(notifyDeleteSlice.actions.open());
  };

  const handleCloseModal = () => {
    dispatch(notifyDeleteSlice.actions.close());
  };

  const handleConfirmDelete = async (id) => {
    try {
      const results = await dispatch(deleteSubject(id));
      const data = unwrapResult(results);
      await dispatch(subjectSlice.actions.deleteSubjectAction(id));
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
      title: "Chuyên ngành",
      dataIndex: "name_subject",
      key: "name_major",
      render: (_, item) => {
        return (
          <>
            <p className="font-semibold ">{item.name_subject}</p>
            <p className="text-xs">{item.code_subject}</p>
          </>
        );
      },
    },
    {
      title: "Tín chỉ",
      dataIndex: "credit_subject",
      key: "credit_subject",
    },
    {
      title: "Khoa",
      dataIndex: "name_fac",
      key: "name_fac",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (_, item) => {
        return (
          <>
            <ActionTable
              openModalUpdate={openModalUpdate}
              openModalDelete={openModalDelete}
              id={item.id_subject}
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
          <div>Môn học</div>
          <Button onClick={openModal}>Thêm môn học</Button>
        </div>
      </PageTitle>

      {subjectId !== null && (
        <NotifyDelete
          handleConfirmDelete={handleConfirmDelete}
          handleCloseModal={handleCloseModal}
          id={subjectId[0].id_subject}
        />
      )}
      <SubjectModals
        faculty={faculty}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      />
      {subjectRecord !== null && (
        <SubjectUpdateModals
          isModalOpen={isModalUpdate}
          openModalUpdate={openModalUpdate}
          closeModal={closeModalUpdate}
          faculty={faculty}
        />
      )}
      <Table
        className="p-0 dark:bg-gray-80"
        keyRow="id"
        dataSource={subject}
        columns={columns}
        pagination={{ pageSize: 10 }}
      />
    </>
  );
}

export default SubjectTables;
