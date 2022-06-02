import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import majorSlice, {
  getMajor,
  deleteMajor,
  updateMajor,
  findMajor,
} from "./majorSlice";
import notifyDeleteSlice from "../../components/NotifyDelete/notifyDeleteSlice";
import {
  getFacultySelector,
  getMajorSelector,
  notifyDeleteSelector,
  findMajorSelector,
  findIdMajorSelector,
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

import MajorModals from "../Major/MajorModals";
import MajorUpdateModals from "../Major/MajorUpdateModal";
import { unwrapResult } from "@reduxjs/toolkit";
import NotifyDelete from "../../components/NotifyDelete/NotifyDelete";
import ActionTable from "../../components/ActionTable";
import { getFaculty } from "../Faculty/facultySlice";

function MajorTables() {
  const dispatch = useDispatch();
  const major = useSelector(getMajorSelector);
  const majorRecord = useSelector(findMajorSelector);
  const majorId = useSelector(findIdMajorSelector);
  const faculty = useSelector(getFacultySelector);

  const response = major?.concat([]);
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
    dispatch(majorSlice.actions.clearState());
  }

  const [pageTable, setPageTable] = useState(1);

  const [dataTable, setDataTable] = useState([]);

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = response?.length;

  useEffect(() => {
    Promise.all([dispatch(getMajor()), dispatch(getFaculty())]);
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
      const result = await dispatch(findMajor(id));
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
    dispatch(majorSlice.actions.findIdDelete(id));
    dispatch(notifyDeleteSlice.actions.open());
  };

  const handleCloseModal = () => {
    dispatch(notifyDeleteSlice.actions.close());
  };

  const handleConfirmDelete = async (id) => {
    try {
      const results = await dispatch(deleteMajor(id));
      const data = unwrapResult(results);
      await dispatch(majorSlice.actions.deleteMajorAction(id));
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
      dataIndex: "name_major",
      key: "name_major",
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
              id={item.id_major}
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
          <div>Chuyên ngành</div>
          <Button onClick={openModal}>Thêm chuyên ngành</Button>
        </div>
      </PageTitle>

      {majorId !== null && (
        <NotifyDelete
          handleConfirmDelete={handleConfirmDelete}
          handleCloseModal={handleCloseModal}
          id={majorId[0].id_major}
        />
      )}
      <MajorModals
        faculty={faculty}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      />
      {majorRecord !== null && (
        <MajorUpdateModals
          isModalOpen={isModalUpdate}
          openModalUpdate={openModalUpdate}
          closeModal={closeModalUpdate}
          faculty={faculty}
        />
      )}
      <Table
        className="p-0 dark:bg-gray-80"
        keyRow="id"
        dataSource={major}
        columns={columns}
        pagination={{ pageSize: 10 }}
      />
    </>
  );
}

export default MajorTables;
