import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import employeeSlice, {
  getEmployee,
  deleteEmployee,
  updateEmployee,
  findEmployee,
} from "./employeeSlice";
import notifyDeleteSlice from "../../components/NotifyDelete/notifyDeleteSlice";
import {
  getEmployeeSelector,
  findEmployeeSelector,
  findIdEmployeeSelector,
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

import EmployeeModals from "../Employee/EmployeeModals";
import EmployeeUpdateModals from "../Employee/EmployeeUpdateModal";
import { unwrapResult } from "@reduxjs/toolkit";
import NotifyDelete from "../../components/NotifyDelete/NotifyDelete";
import ActionTable from "../../components/ActionTable";

function EmployeeTables() {
  const dispatch = useDispatch();
  const employee = useSelector(getEmployeeSelector);
  const employeeRecord = useSelector(findEmployeeSelector);
  const employeeId = useSelector(findIdEmployeeSelector);

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
    dispatch(employeeSlice.actions.clearState());
  }

  useEffect(() => {
    Promise.all([dispatch(getEmployee())]);
  }, []);

  useEffect(() => {
    setDataTable(
      employee?.slice(
        (pageTable - 1) * resultsPerPage,
        pageTable * resultsPerPage
      )
    );
  }, [pageTable]);

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = employee?.length;

  const onPageChangeTable = (p) => {
    setPageTable(p);
  };

  const openModalUpdate = async (id) => {
    try {
      const result = await dispatch(findEmployee(id.replace(/ /g, "")));
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
    dispatch(employeeSlice.actions.findIdDelete(id.replace(/ /g, "")));
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
      const results = await dispatch(deleteEmployee(id));
      const data = unwrapResult(results);
      await dispatch(employeeSlice.actions.deleteEmployeeAction(id));
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
      title: "Nhân viên",
      dataIndex: "name_emp",
      key: "name_emp",
      render: (_, item) => {
        return (
          <>
            <div className="flex items-center text-sm">
              <Avatar
                src="https://res.cloudinary.com/i-h-c-n-ng/image/upload/v1649606919/avatar_4_otwwto.png"
                alt="Judith"
              />
              <div className="ml-3">
                <p className="font-semibold ">{item.name_emp}</p>
                <p className="text-xs">{item.id_emp}</p>
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
            <p className="capitalize">{item.gender_emp}</p>
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
            <p className="">{formatDate(item.birthday_emp)}</p>
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
            <p className="">0{item.mobile_emp}</p>
            <p className=" ">{item.email_emp}</p>
          </>
        );
      },
    },
    {
      title: "Công việc",
      dataIndex: "name_major",
      key: "name_job",
      render: (_, item) => {
        return (
          <>
            <p className="">{item.name_job}</p>
            <p className=" ">{item.name_academic}</p>
          </>
        );
      },
    },
    {
      title: "Quê quán",
      dataIndex: "hometown_emp",
      key: "hometown_emp",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address_emp",
      key: "address_emp",
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
              id={item.id_emp.replace(/ +(?= )/g, "")}
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
          <div>Cán bộ viên chức</div>
          <Button onClick={openModal}>Thêm cán bộ viên chức</Button>
        </div>
      </PageTitle>

      {employeeId !== null && (
        <NotifyDelete
          handleConfirmDelete={handleConfirmDelete}
          handleCloseModal={handleCloseModal}
          id={employeeId[0].id_emp.replace(/ /g, "")}
        />
      )}
      <EmployeeModals isModalOpen={isModalOpen} closeModal={closeModal} />
      {employeeRecord !== null && (
        <EmployeeUpdateModals
          isModalOpen={isModalUpdate}
          openModalUpdate={openModalUpdate}
          closeModal={closeModalUpdate}
        />
      )}
      <Table
        className="p-0 dark:bg-gray-80"
        keyRow="id"
        dataSource={employee}
        columns={columns}
        pagination={{ pageSize: 10 }}
      />
    </>
  );
}

export default EmployeeTables;
