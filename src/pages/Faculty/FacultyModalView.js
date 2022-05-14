import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import facultySlice, { addFaculty, getFaculty } from "../Faculty/facultySlice";
import { findFacultyViewSelector } from "../../redux/selector";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  Badge,
  TableFooter,
  Pagination,
  Select,
} from "@windmill/react-ui";
import FacultyForms from "../../components/FacultyForm/FacultyForms";
import { unwrapResult } from "@reduxjs/toolkit";
import FacultyModalAddEmploy from "./FacultyModalAddEmploy";

function FacultyModalView({ isModalOpen, closeModal }) {
  const dispatch = useDispatch();
  const [pageTable, setPageTable] = useState(1);
  const [dataTable, setDataTable] = useState([]);
  const [isModalAdd, setIsModalAdd] = useState(false);
  const response = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  const facultyRecordView = useSelector(findFacultyViewSelector);
  console.log(facultyRecordView);

  // pagination setup
  const resultsPerPage = 6;
  const totalResults = response?.length;

  const openModalAdd = () => {
    setIsModalAdd(true);
  };

  const closeModalAdd = () => {
    setIsModalAdd(false);
  };

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
  return (
    <>
      <ToastContainer />
      <FacultyModalAddEmploy
        isModalOpen={isModalAdd}
        closeModal={closeModalAdd}
      />
      {isModalOpen && (
        <div className="fixed inset-0 z-40 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center appear-done enter-done">
          <div className="w-full px-6 py-4 overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-4xl appear-done enter-done">
            <form>
              <ModalBody>
                <div className="flex justify-between">
                  <div className="capitalize font-semibold text-lg">
                    Khoa Ky thuat may tinh
                  </div>
                  <div>
                    <Button layout="outline">Thêm Chức Vụ</Button>
                    <Button
                      className="ml-2"
                      layout="outline"
                      onClick={() => openModalAdd()}
                    >
                      Thêm Nhân Viên
                    </Button>
                  </div>
                </div>
                <div>
                  <TableContainer className="mt-6  overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableCell>STT</TableCell>
                          <TableCell>Nhân viên</TableCell>
                          <TableCell>Số điện thoại</TableCell>
                          <TableCell>Công việc</TableCell>
                          <TableCell>Chức vụ</TableCell>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dataTable.map((item, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>
                                <div className="flex items-center text-sm">
                                  <Avatar
                                    src="https://res.cloudinary.com/i-h-c-n-ng/image/upload/v1649606919/avatar_4_otwwto.png"
                                    alt="Judith"
                                  />
                                  <span className="font-semibold ml-2">
                                    Judith Ipsum {item}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <span className="text-sm">0326625927</span>
                              </TableCell>
                              <TableCell>
                                <span className="text-sm">
                                  Quản trị kinh doanh
                                </span>
                              </TableCell>
                              <TableCell>
                                <Select>
                                  <option>$1,000</option>
                                  <option>$5,000</option>
                                </Select>
                              </TableCell>
                            </TableRow>
                          );
                        })}
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
                </div>
              </ModalBody>
              <ModalFooter>
                <div className="hidden sm:block">
                  <Button onClick={closeModal}>Hủy bỏ</Button>
                </div>
                <div className="block w-full sm:hidden">
                  <Button block size="large" onClick={closeModal}>
                    Hủy bỏ
                  </Button>
                </div>
              </ModalFooter>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default FacultyModalView;
