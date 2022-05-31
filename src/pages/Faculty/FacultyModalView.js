import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import facultySlice, {
  addFaculty,
  getFaculty,
  findFacultyView,
  updateEmployeePositionFaculty,
} from "../Faculty/facultySlice";
import { getPositionFaculty } from "../Faculty/positionFacultySlice";
import { getEmployeePositionFaculty } from "../../pages/Employee/employeeSlice";
import {
  findFacultyViewSelector,
  getPositionFacultySelector,
  findIdFacultyViewSelector,
} from "../../redux/selector";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  TableContainer,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  Badge,
  TableFooter,
  Pagination,
  Select,
  Table,
} from "@windmill/react-ui";
import { EditIcon, TrashIcon, ViewIcon } from "../../icons/index";
import FacultyForms from "../../components/FacultyForm/FacultyForms";
import { unwrapResult } from "@reduxjs/toolkit";
import FacultyModalAddEmploy from "./FacultyModalAddEmploy";
import FacultyFormSelect from "../../components/FacultyForm/FacultyFormSelect";
// import { Table } from "antd";
function FacultyModalView({ isModalOpen, closeModal }) {
  const dispatch = useDispatch();
  const facultyRecordView = useSelector(findFacultyViewSelector);
  const positionFaculty = useSelector(getPositionFacultySelector);
  const idFacultyView = useSelector(findIdFacultyViewSelector);
  const [pageTable, setPageTable] = useState(1);
  const [dataTable, setDataTable] = useState(facultyRecordView?.slice(0,5));
  const [isModalAdd, setIsModalAdd] = useState(false);
  const [postAPI, setPostAPI] = useState({ id_emp: "", id_pos_fac: "" });
  const [formPositionFaculty, setFormFaculty] = useState({
    id_emp: "",
    id_pos_fac: "",
  });
  const handleOnchange = (e) => {
    setFormFaculty({ ...formPositionFaculty, [e.target.name]: e.target.value });
  };
  const handleChangePosition = async (event, id) => {
    const { value } = event.target;
    Promise.all([
      setPostAPI({ id_emp: id.trim(), id_pos_fac: value }),
      dispatch(
        facultySlice.actions.updateFacultyEmployee({
          id: id?.replace(/ +(?= )/g, ""),
          id_pos_fac: value,
        })
      ),
    ]);
  };

  useEffect(() => {
    try {
      Promise.all([dispatch(updateEmployeePositionFaculty(postAPI))]);
      // toast.success(`Cập nhật thành công`, {
      //   position: "top-right",
      //   autoClose: 3000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // });
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
    
    // dispatch(findFacultyView(idFacultyView[0].id_fac))
  }, [postAPI]);

  useEffect(() => {
    setDataTable(
      facultyRecordView?.slice(
        (pageTable - 1) * resultsPerPage,
        pageTable * resultsPerPage
      )
    );
  }, [pageTable]);

  //pagination
  const resultsPerPage = 5;
  const totalResults = facultyRecordView?.length;

  const openModalAdd = () => {
    dispatch(getEmployeePositionFaculty())
    setIsModalAdd(true);
  };

  const closeModalAdd = () => {
    setFormFaculty({ id_emp: "", id_pos_fac: "" });
    setIsModalAdd(false);
  };

  const onPageChangeTable = (p) => {
    setPageTable(p);
  };

  const columns = [
    {
      title: "STT",
      key: "id_emp",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Nhân viên",
      dataIndex: "name_emp",
      key: "name_emp",
    },
    {
      title: "Số điện thoại",
      dataIndex: "mobile_emp",
      key: "mobile_emp",
    },
    {
      title: "Email",
      dataIndex: "email_emp",
      key: "email_emp",
    },
    {
      title: "Công việc",
      dataIndex: "name_job",
      key: "name_job",
    },
    {
      title: "Chức vụ",
      dataIndex: "id_pos_fac",
      key: "id_pos_fac",
      render: (_, item) => {
        return (
          <FacultyFormSelect
            handleOnchange={handleChangePosition}
            positionFaculty={positionFaculty}
            id_pos_fac={item.id_pos_fac}
            id_emp={item.id_emp}
          />
        );
      },
    },
  ];

  return (
    <>
      <ToastContainer />
      <FacultyModalAddEmploy
        isModalOpen={isModalAdd}
        closeModal={closeModalAdd}
        id={idFacultyView[0]?.id_fac}
        handleOnchange={handleOnchange}
        formPositionFaculty={formPositionFaculty}
      />
      {isModalOpen && (
        <div className="fixed inset-0 z-40 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center appear-done enter-done">
          <div className="w-full px-6 py-4 overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-4xl appear-done enter-done">
            <div>
              <ModalBody>
                <div className="flex justify-between">
                  <div className="capitalize font-semibold text-lg">
                    {idFacultyView[0]?.name_fac}
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
                <form>
                  {facultyRecordView === null ? (
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
                          {dataTable?.map((item, index) => {
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
                                <FacultyFormSelect
                                  handleOnchange={handleChangePosition}
                                  positionFaculty={positionFaculty}
                                  id_pos_fac={item.id_pos_fac}
                                  id_emp={item.id_emp}
                                />
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
                    // <Table
                    //   className="p-0"
                    //   rowKey="id"
                    //   dataSource={facultyRecordView}
                    //   columns={columns}
                    //   pagination={{ pageSize: 5 }}
                    // />
                  )}
                </form>
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FacultyModalView;
