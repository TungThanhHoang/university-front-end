import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import classSlice, {
  getClass,
  deleteClass,
  updateClass,
  findClass,
  findClassView,
} from "./classSlice";
import notifyDeleteSlice from "../../components/NotifyDelete/notifyDeleteSlice";
import {
  getMajorSelector,
  getClassSelector,
  notifyDeleteSelector,
  findClassSelector,
  findIdClassSelector,
  findIdClassViewSelector,
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

import ClassModals from "../Class/ClassModals";
import ClassUpdateModals from "../Class/ClassUpdateModal";
import { unwrapResult } from "@reduxjs/toolkit";
import NotifyDelete from "../../components/NotifyDelete/NotifyDelete";
import ActionTable from "../../components/ActionTable";
import { getMajor } from "../Major/majorSlice";
import ClassModalView from "./ClassModalView";

function MajorTables() {
  const dispatch = useDispatch();
  const classUni = useSelector(getClassSelector);
  const classRecord = useSelector(findClassSelector);
  const classId = useSelector(findIdClassSelector);
  const major = useSelector(getMajorSelector);
  const idClassView = useSelector(findIdClassViewSelector);
  const response = classUni?.concat([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdate, setIsModalUpdate] = useState(false);
  const [isModalView, setIsModalView] = useState(false);

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
    dispatch(classSlice.actions.clearState());
  }

  function closeModalView() {
    setIsModalView(false);
    dispatch(classSlice.actions.clearState());
  }

  const openModalView = async (id) => {
    try {
      await dispatch(classSlice.actions.findIdView(id.trim()));
      await dispatch(findClassView(id.trim()));
      setIsModalView(true);
    } catch (error) {
      console.log(error);
    }
  };
  // pagination setup
  const resultsPerPage = 10;
  const totalResults = response?.length;

  useEffect(() => {
    Promise.all([dispatch(getMajor()), dispatch(getClass())]);
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
      const result = await dispatch(findClass(id));
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
    dispatch(classSlice.actions.findIdDelete(id));
    dispatch(notifyDeleteSlice.actions.open());
  };

  const handleCloseModal = () => {
    dispatch(notifyDeleteSlice.actions.close());
  };

  const handleConfirmDelete = async (id) => {
    try {
      const results = await dispatch(deleteClass(id.trim()));
      const data = unwrapResult(results);
      await dispatch(classSlice.actions.deleteClassAction(id.trim()));
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
      title: "Lớp",
      dataIndex: "name_class",
      key: "name_class",
      render: (_, item) => {
        return (
          <>
            <p className="font-semibold">{item.name_class}</p>
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
      title: "Khóa",
      dataIndex: "course",
      key: "course",
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
              id={item.id_class.trim()}
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
          <div>Lớp học</div>
          <Button onClick={openModal}>Thêm lớp học</Button>
        </div>
      </PageTitle>

      {classId !== null && (
        <NotifyDelete
          handleConfirmDelete={handleConfirmDelete}
          handleCloseModal={handleCloseModal}
          id={classId[0].id_class.trim()}
        />
      )}
      {idClassView !== null && (
        <ClassModalView isModalOpen={isModalView} closeModal={closeModalView} />
      )}
      <ClassModals
        major={major}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      />
      {classRecord !== null && (
        <ClassUpdateModals
          isModalOpen={isModalUpdate}
          openModalUpdate={openModalUpdate}
          closeModal={closeModalUpdate}
          major={major}
        />
      )}
      <Table
        className="p-0 dark:bg-gray-80"
        keyRow="id"
        dataSource={classUni}
        columns={columns}
        pagination={{ pageSize: 10 }}
      />
    </>
  );
}

export default MajorTables;
