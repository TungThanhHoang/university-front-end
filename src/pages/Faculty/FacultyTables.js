import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import facultySlice, {
  getFaculty,
  deleteFaculty,
  updateFaculty,
  findFaculty,
  findIdView,
  findFacultyView,
} from "./facultySlice";
import notifyDeleteSlice from "../../components/NotifyDelete/notifyDeleteSlice";
import {
  getFacultySelector,
  notifyDeleteSelector,
  findFacultySelector,
  findIdFacultySelector,
  findFacultyViewSelector
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
  const response = faculty?.concat([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdate, setIsModalUpdate] = useState(false);
  const [isModalView, setIsModalView] = useState(false);
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

  const [pageTable, setPageTable] = useState(1);

  const [dataTable, setDataTable] = useState([]);

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = response?.length;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await dispatch(getFaculty());
        const data = unwrapResult(results);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
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
  // Open Modal View
  const openModalView = async (id) => {
    try {
      const result = await dispatch(findFacultyView(id));
      const data = unwrapResult(result);
      if (data) {
        setIsModalView(true);
      }
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
      {facultyRecordView !== null && (
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
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>STT</TableCell>
              <TableCell>Khoa</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Miêu tả</TableCell>
              <TableCell>Hành động</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {faculty?.map((item, i) => (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold capitalize">
                        {item.name_fac}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {item.id_code}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{item.phone_fac}</span>
                </TableCell>
                <TableCell className="">
                  <span className="text-sm ">{item.descipt_fac}</span>
                </TableCell>
                <ActionTable
                  openModalUpdate={openModalUpdate}
                  openModalDelete={openModalDelete}
                  openModalView={openModalView}
                  id={item.id_fac}
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

export default FacultyTables;
