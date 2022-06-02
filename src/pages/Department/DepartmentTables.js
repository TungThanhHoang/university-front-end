import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import departmentSlice, {
  getDepartment,
  deleteDepartment,
  updateDepartment,
  findDepartment,
} from "./departmentSlice";
import notifyDeleteSlice from "../../components/NotifyDelete/notifyDeleteSlice";
import {
  getDepartmentSelector,
  notifyDeleteSelector,
  findDepartmentSelector,
  findIdDepartmentSelector,
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

import DepartmentModals from "../Department/DepartmentModals";
import DepartmentUpdateModals from "../Department/DepartmentUpdateModal";
import { unwrapResult } from "@reduxjs/toolkit";
import NotifyDelete from "../../components/NotifyDelete/NotifyDelete";
import ActionTable from "../../components/ActionTable";

function DepartmentTables() {
  const dispatch = useDispatch();
  const department = useSelector(getDepartmentSelector);
  const departmentRecord = useSelector(findDepartmentSelector);
  const departmentId = useSelector(findIdDepartmentSelector);

  console.log(departmentRecord);
  const response = department?.concat([]);
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
    dispatch(departmentSlice.actions.clearState());
  }

  const [pageTable, setPageTable] = useState(1);

  const [dataTable, setDataTable] = useState([]);

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = response?.length;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await dispatch(getDepartment());
        const data = unwrapResult(results);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const openModalUpdate = async (id) => {
    try {
      const result = await dispatch(findDepartment(id));
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
    dispatch(departmentSlice.actions.findIdDelete(id));
    dispatch(notifyDeleteSlice.actions.open());
  };

  const handleCloseModal = () => {
    dispatch(notifyDeleteSlice.actions.close());
  };

  const handleConfirmDelete = async (id) => {
    try {
      const results = await dispatch(deleteDepartment(id));
      const data = unwrapResult(results);
      await dispatch(departmentSlice.actions.deleteDepartmentAction(id));
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
      title: "Phòng ban",
      dataIndex: "name_dep",
      key: "name_dep",
      render: (_, item) => {
        return (
          <>
            <p className="capitalize font-semibold">{item.name_dep}</p>
            <p className="text-xs">{item.id_code}</p>
          </>
        );
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone_dep",
      key: "phone_dep",
    },
    {
      title: "Miêu tả",
      dataIndex: "descript_dep",
      key: "descript_dep",
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
              id={item.id_dep}
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
          <div>Phòng ban</div>
          <Button onClick={openModal}>Thêm phòng ban</Button>
        </div>
      </PageTitle>

      {departmentId !== null && (
        <NotifyDelete
          handleConfirmDelete={handleConfirmDelete}
          handleCloseModal={handleCloseModal}
          id={departmentId[0].id_dep}
        />
      )}
      <DepartmentModals isModalOpen={isModalOpen} closeModal={closeModal} />
      {departmentRecord !== null && (
        <DepartmentUpdateModals
          isModalOpen={isModalUpdate}
          openModalUpdate={openModalUpdate}
          closeModal={closeModalUpdate}
        />
      )}
      <Table
        className="p-0 dark:bg-gray-80"
        keyRow="id"
        dataSource={department}
        columns={columns}
        pagination={{ pageSize: 10 }}
      />
    </>
  );
}

export default DepartmentTables;
