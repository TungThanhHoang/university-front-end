import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import facultySlice, {
  getFaculty,
  deleteFaculty,
  findFaculty,
  findFacultyView,
} from "./facultySlice";
import { getPositionFaculty } from "./positionFacultySlice";
import notifyDeleteSlice from "../../components/NotifyDelete/notifyDeleteSlice";
import {
  getFacultySelector,
  notifyDeleteSelector,
  findFacultySelector,
  findIdFacultySelector,
  findFacultyViewSelector,
  findIdFacultyViewSelector,
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

import response2 from "../../utils/demo/tableData";
import FacultyModals from "../Faculty/FacultyModals";
import FacultyUpdateModals from "../Faculty/FacultyUpdateModal";
import { unwrapResult } from "@reduxjs/toolkit";
import NotifyDelete from "../../components/NotifyDelete/NotifyDelete";
import ActionTable from "../../components/ActionTable";
import FacultyModalView from "./FacultyModalView";

function FacultyTables() {
  const dispatch = useDispatch();
  const faculty = useSelector(getFacultySelector);
  const facultyRecord = useSelector(findFacultySelector);
  const facultyRecordView = useSelector(findFacultyViewSelector);
  const facultyId = useSelector(findIdFacultySelector);
  const idFacultyView = useSelector(findIdFacultyViewSelector);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdate, setIsModalUpdate] = useState(false);
  const [isModalView, setIsModalView] = useState(false);
  const [pageTable, setPageTable] = useState(1);
  const [dataTable, setDataTable] = useState([]);
  // Modal add
  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function closeModalView() {
    setIsModalView(false);
    dispatch(facultySlice.actions.clearState());
  }
  // Modal Update
  function closeModalUpdate() {
    setIsModalUpdate(false);
    dispatch(facultySlice.actions.clearState());
  }

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = faculty?.length;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await dispatch(getFaculty());
        const data = unwrapResult(results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setDataTable(
      faculty?.slice(
        (pageTable - 1) * resultsPerPage,
        pageTable * resultsPerPage
      )
    );
  }, [pageTable]);

  const onPageChangeTable = (p) => {
    setPageTable(p);
  };
  // Open Modal View
  const openModalView = async (id) => {
    try {
      await dispatch(facultySlice.actions.findIdView(id));
      const result = await dispatch(findFacultyView(id));
      await dispatch(getPositionFaculty(id));
      const data = unwrapResult(result);
      setIsModalView(true);
    } catch (error) {
      console.log(error);
    }
  };
  //  Open Modal Update
  const openModalUpdate = async (id) => {
    try {
      const result = await dispatch(findFaculty(id));
      const data = unwrapResult(result);
      if (data) {
        setIsModalUpdate(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openModalDelete = (id) => {
    dispatch(facultySlice.actions.findIdDelete(id));
    dispatch(notifyDeleteSlice.actions.open());
  };

  const handleCloseModal = () => {
    dispatch(notifyDeleteSlice.actions.close());
  };

  const handleConfirmDelete = async (id) => {
    try {
      const results = await dispatch(deleteFaculty(id));
      const data = unwrapResult(results);
      await dispatch(facultySlice.actions.deleteFacultyAction(id));
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
      title: "Khoa",
      dataIndex: "name_fac",
      key: "name_fac",
      render: (_, item) => {
        return (
          <>
            <p className="capitalize font-semibold">{item.name_fac}</p>
            <p className="text-xs">{item.id_code}</p>
          </>
        );
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone_fac",
      key: "phone_fac",
    },
    {
      title: "Miêu tả",
      dataIndex: "descipt_fac",
      key: "descipt_fac",
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
              openModalView={openModalView}
              viewAction={true}
              id={item.id_fac}
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
          <div>Khoa</div>
          <Button onClick={openModal}>Thêm khoa</Button>
        </div>
      </PageTitle>

      {facultyId !== null && (
        <NotifyDelete
          handleConfirmDelete={handleConfirmDelete}
          handleCloseModal={handleCloseModal}
          id={facultyId[0].id_fac}
        />
      )}
      {idFacultyView !== null && (
        <FacultyModalView
          isModalOpen={isModalView}
          closeModal={closeModalView}
        />
      )}
      <FacultyModals isModalOpen={isModalOpen} closeModal={closeModal} />
      {facultyRecord !== null && (
        <FacultyUpdateModals
          isModalOpen={isModalUpdate}
          openModalUpdate={openModalUpdate}
          closeModal={closeModalUpdate}
        />
      )}
      <Table
        className="p-0 dark:bg-gray-80"
        keyRow="id"
        dataSource={faculty}
        columns={columns}
        pagination={{ pageSize: 10 }}
      />
    </>
  );
}

export default FacultyTables;
