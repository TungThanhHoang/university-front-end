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
      <TableContainer className="mb-8 ">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>STT</TableCell>
              <TableCell>Môn học</TableCell>
              <TableCell>Số tín chỉ</TableCell>
              <TableCell>Khoa</TableCell>
              <TableCell>Hành động</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {subject?.map((item, i) => (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold capitalize">
                        {item.name_subject}
                      </p>
                      <p className="font-normal text-xs capitalize">
                        {item.code_subject}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <p className="font-semibold capitalize">{item.credit_subject}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <p className="font-semibold capitalize">{item.name_fac}</p>
                  </div>
                </TableCell>
                <ActionTable
                  openModalUpdate={openModalUpdate}
                  openModalDelete={openModalDelete}
                  id={item.id_subject}
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

export default SubjectTables;
