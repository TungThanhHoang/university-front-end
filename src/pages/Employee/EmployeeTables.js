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
  Table,
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
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>STT</TableCell>
              <TableCell>Tên Nhân Viên</TableCell>
              <TableCell>Giới tính</TableCell>
              <TableCell>Ngày Sinh</TableCell>
              <TableCell>Quê Quán</TableCell>
              <TableCell>Địa chỉ hiện tại</TableCell>
              <TableCell>Học vấn</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Hành động</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable?.map((item, i) => (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold capitalize">
                        {item.name_emp}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {item.id_emp}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className=" capitalize ">{item.gender_emp}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className=" capitalize">
                        {formatDate(item.birthday_emp)}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className=" capitalize">{item.hometown_emp}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className=" capitalize">{item.address_emp}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className=" capitalize">{item.name_academic}</p>
                      <p className=" capitalize">{item.name_job}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className=" capitalize">{item.mobile_emp}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="">{item.email_emp}</p>
                    </div>
                  </div>
                </TableCell>
                <ActionTable
                  openModalUpdate={openModalUpdate}
                  openModalDelete={openModalDelete}
                  id={item.id_emp.replace(/ +(?= )/g, "")}
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
    </>
  );
}

export default EmployeeTables;
