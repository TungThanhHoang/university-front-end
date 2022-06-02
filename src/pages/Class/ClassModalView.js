import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import facultySlice, {
  updateEmployeePositionFaculty,
} from "../Faculty/facultySlice";
import { getPositionFaculty } from "../Faculty/positionFacultySlice";
import { getEmployeePositionFaculty } from "../Employee/employeeSlice";
import {
  findIdClassViewSelector,
  findClassViewSelector,
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
  // Table,
} from "@windmill/react-ui";
import { EditIcon, TrashIcon, ViewIcon } from "../../icons/index";
import { Table } from "antd";
function ClassModalView({ isModalOpen, closeModal }) {
  const dispatch = useDispatch();
  const classRecordView = useSelector(findClassViewSelector);
  const idClassView = useSelector(findIdClassViewSelector);
  const [pageTable, setPageTable] = useState(1);
  const [dataTable, setDataTable] = useState(classRecordView?.slice(0, 5));
  const [isModalAdd, setIsModalAdd] = useState(false);
  const [postAPI, setPostAPI] = useState({ id_emp: "", id_pos_fac: "" });

  // const handleChangePosition = async (event, id) => {
  //   const { value } = event.target;
  //   Promise.all([
  //     setPostAPI({ id_emp: id.trim(), id_pos_fac: value }),
  //     dispatch(
  //       classSlice.actions.updateFacultyEmployee({
  //         id: id?.replace(/ +(?= )/g, ""),
  //         id_pos_fac: value,
  //       })
  //     ),
  //   ]);
  // };

  useEffect(() => {
    setDataTable(
      classRecordView?.slice(
        (pageTable - 1) * resultsPerPage,
        pageTable * resultsPerPage
      )
    );
  }, [pageTable]);

  //pagination
  const resultsPerPage = 5;
  const totalResults = classRecordView?.length;

  const openModalAdd = () => {
    setIsModalAdd(true);
  };

  const onPageChangeTable = (p) => {
    setPageTable(p);
  };

  const formatDate = (birthday) => {
    let data = new Date(birthday);
    return data.toLocaleDateString();
  };

  const columns = [
    {
      title: "STT",
      key: "stt",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Học sinh",
      dataIndex: "name_student",
      key: "name_student",
      render: (_, item) => {
        return (
          <>
            <div className="flex items-center text-sm">
              <Avatar
                src="https://res.cloudinary.com/i-h-c-n-ng/image/upload/v1649606919/avatar_4_otwwto.png"
                alt="Judith"
              />
              <div className="ml-3">
                <p className="font-semibold ">{item.name_student}</p>
                <p className="text-xs">{item.id_student}</p>
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
            <p className="capitalize">{item.gender_student}</p>
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
            <p className="">{formatDate(item.birthday_student)}</p>
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
            <p className="">0{item.mobile_student}</p>
            <p className=" ">{item.email_student}</p>
          </>
        );
      },
    },
    {
      title: "Quê quán",
      dataIndex: "hometown_student",
      key: "hometown_student",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address_student",
      key: "address_student",
    },
  ];

  return (
    <>
      <ToastContainer />
      {isModalOpen && (
        <div className="fixed inset-0 z-40 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center appear-done enter-done">
          <div className="w-full px-6 py-4 overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-4xl appear-done enter-done">
            <div>
              <ModalBody>
                <div className="flex justify-between mb-5">
                  <div className="capitalize font-semibold text-lg">
                    Lớp {idClassView[0]?.name_class}
                  </div>
                  <div className="font-normal">
                    Tổng số sinh viên{" "}
                    <span className="font-semibold">
                      {classRecordView.length}
                    </span>{" "}
                    sv
                  </div>
                </div>
                <form>
                  {classRecordView === null ? (
                    "Không có dữ liệu"
                  ) : (
                    <Table
                      className="p-0"
                      key=""
                      dataSource={classRecordView}
                      columns={columns}
                      pagination={{ pageSize: 5 }}
                    />
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

export default ClassModalView;
