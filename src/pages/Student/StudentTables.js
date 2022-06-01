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
      <StudentModals isModalOpen={isModalOpen} closeModal={closeModal} classUni={classUni} />
      {studentRecord !== null && (
        <StudentUpdateModals
          isModalOpen={isModalUpdate}
          openModalUpdate={openModalUpdate}
          closeModal={closeModalUpdate}
          classUni={classUni}
        />
      )}
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>STT</TableCell>
              <TableCell>Tên học sinh</TableCell>
              <TableCell>Giới tính</TableCell>
              <TableCell>Ngày Sinh</TableCell>
              <TableCell>Quê Quán</TableCell>
              <TableCell>Địa chỉ hiện tại</TableCell>
              <TableCell>Cá nhân</TableCell>
              <TableCell>Chuyên ngành</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Hành động</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {student?.map((item, i) => (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold capitalize">
                        {item.name_student}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {item.id_student}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className=" capitalize ">{item.gender_student}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className=" capitalize">
                        {formatDate(item.birthday_student)}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className=" capitalize">{item.hometown_student}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className=" capitalize">{item.address_student}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className=" capitalize">0{item.mobile_student}</p>
                      <p className=" text-xs capitalize">{item.name_class}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className=" capitalize">{item.name_major}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="">{item.email_student}</p>
                    </div>
                  </div>
                </TableCell>
                <ActionTable
                  openModalUpdate={openModalUpdate}
                  openModalDelete={openModalDelete}
                  id={item.id_student.replace(/ +(?= )/g, "")}
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

export default StudentTables;
