import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import facultySlice, {
  addFaculty,
  getFaculty,
  findFacultyView,
  
} from "../Faculty/facultySlice";
import { getPositionFaculty } from "../Faculty/positionFacultySlice";
import { updateEmployeePositionFaculty ,getEmployeePositionFaculty } from "../../pages/Employee/employeeSlice";
import {
  findFacultyViewSelector,
  getPositionFacultySelector,
} from "../../redux/selector";
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
  const facultyRecordView = useSelector(findFacultyViewSelector);
  const positionFaculty = useSelector(getPositionFacultySelector);

  console.log(facultyRecordView);

  const [positionFacultyEmp, setpositionFacultyEmp] = useState("");
  const [pageTable, setPageTable] = useState(1);
  const [dataTable, setDataTable] = useState([]);
  const [isModalAdd, setIsModalAdd] = useState(false);

  const [formPositionFaculty, setFormFaculty] = useState({
    id_emp: "",
    id_pos_fac: "",
  });

  const handleOnchange = (e) => {
    setFormFaculty({ ...formPositionFaculty, [e.target.name]: e.target.value });
  };

  console.log("pos", positionFacultyEmp);
  const handleChangePosition = async (event, id) => {
    try {
      await dispatch(
        updateEmployeePositionFaculty({
          id_pos_fac: event.target.value || null,
          id_emp: id?.trim(),
        })
      );
       dispatch(findFacultyView(facultyRecordView[0]?.id_fac));
       dispatch(getPositionFaculty(facultyRecordView[0]?.id_fac));
      toast.success(`Cập nhật thành công`, {
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

  useEffect(() => {
    setDataTable(
      facultyRecordView?.slice(
        (pageTable - 1) * resultsPerPage,
        pageTable * resultsPerPage
      )
    );
  }, [pageTable]);

  //pagination
  const resultsPerPage = 6;
  const totalResults = facultyRecordView?.length;

  const openModalAdd = () => {
    setIsModalAdd(true);
  };

  const closeModalAdd = () => {
    setFormFaculty({ id_emp: "", id_pos_fac: "" });
    setIsModalAdd(false);
  };

  const onPageChangeTable = (p) => {
    setPageTable(p);
  };

  return (
    <>
      <ToastContainer />
      <FacultyModalAddEmploy
        isModalOpen={isModalAdd}
        closeModal={closeModalAdd}
        id={facultyRecordView[0]?.id_fac}
        handleOnchange={handleOnchange}
        formPositionFaculty={formPositionFaculty}
      />
      {isModalOpen && (
        <div className="fixed inset-0 z-40 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center appear-done enter-done">
          <div className="w-full px-6 py-4 overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-4xl appear-done enter-done">
            <form>
              <ModalBody>
                <div className="flex justify-between">
                  <div className="capitalize font-semibold text-lg">
                    {facultyRecordView[0]?.name_fac}
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
                  {dataTable.length === 0 ? (
                    "Không có dữ liệu"
                  ) : (
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
                          {facultyRecordView?.map((item, index) => {
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
                                      {item.name_emp}
                                    </span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <span className="text-sm">
                                    {item.mobile_emp}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  <span className="text-sm">
                                    {item.name_job}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  <Select
                                    className="mt-1"
                                    name="id_pos_fac"
                                    value={item.id_pos_fac}
                                    onChange={(e) =>
                                      handleChangePosition(e, item.id_emp)
                                    }
                                  >
                                    <option value="">--Không chọn--</option>
                                    {positionFaculty?.map((pos, index) => (
                                      <option
                                        key={index}
                                        value={pos.id_pos_fac}
                                      >
                                        {pos.name_pos_fac}
                                      </option>
                                    ))}
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
                  )}
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
