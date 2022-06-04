import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
} from "@windmill/react-ui";
import { Table } from "antd";
import GpaStudentModalAdd from "./GpaStudentModalAdd";
import classSlice, { deleteGpaStudent } from "../Class/classSlice";
import {
  findGpaStudentViewSelector,
  findIdGpaViewSelector,
} from "../../redux/selector";

const GpaStudentModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const gpaStudent = useSelector(findGpaStudentViewSelector);
  const idGpaStudent = useSelector(findIdGpaViewSelector);
  const [isModalAddGpa, setIsModalAddGpa] = useState(false);

  const openModaladdGpa = () => {
    setIsModalAddGpa(true);
  };

  const closeModalAddGpa = () => {
    setIsModalAddGpa(false);
  };
  const handleDeleteGpa = (e, id) => {
    e.preventDefault();
    try {
      dispatch(deleteGpaStudent(id));
      dispatch(classSlice.actions.findIdGpaDelete(id));
    } catch (error) {
      console.log(error);
    }
  };
  const badgeGpa = {
    excellent: "success",
    good: "primary",
    pass: "warning",
    fail: "danger",
  };
  const sortGpa = (gpa) => {
    if (gpa > 8.5) {
      return "excellent";
    } else if (gpa >= 8) {
      return "good";
    } else if (gpa >= 7) {
      return "pass";
    } else {
      return "fail";
    }
  };

  const convertGpa = (gpa) => {
    let type;
    switch (gpa) {
      case "excellent":
       type =  "Xuất Sắc";
        break;
      case "good":
        type = "Giỏi";
        break;
      case "pass":
        type =  "Khá";
        break;
      case "fail":
        type =  "Trung Bình";
        break;
      default:
        type = "yếu";
    }
    return type;
  };

  const columns = [
    {
      title: "STT",
      key: "stt",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Học kỳ",
      dataIndex: "name_term",
      key: "name_term",
      render: (_, item) => {
        return (
          <>
            <p className="capitalize">{item.name_term}</p>
          </>
        );
      },
    },
    {
      title: "Điểm thang 10",
      dataIndex: "grade_gpa",
      key: "grade_gpa",
      render: (_, item) => {
        return (
          <>
            <p className="capitalize">{item.grade_gpa}</p>
          </>
        );
      },
    },
    {
      title: "Xếp loại",
      dataIndex: "xep_loai",
      key: "xep_loai",
      render: (_, item) => {
        return (
          <>
            <Badge
              type={badgeGpa[sortGpa(Number(item.grade_gpa))]}
              className="capitalize"
            >
              {convertGpa(sortGpa(Number(item.grade_gpa)))}
            </Badge>
          </>
        );
      },
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (_, item) => {
        return (
          <>
            <Button
              size="small"
              layout="outline"
              onClick={(e) => handleDeleteGpa(e, item.id_gpa)}
            >
              Xóa
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <GpaStudentModalAdd
        isModalAddGpa={isModalAddGpa}
        closeModal={closeModalAddGpa}
        id={idGpaStudent[0]?.id_student.trim()}
      />
      <div className="fixed inset-0 z-40 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center appear-done enter-done">
        <div className="w-full px-6 py-4 overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-3xl appear-done enter-done">
          <div>
            <ModalBody>
              <div className="flex justify-between mb-5">
                <div className="capitalize font-semibold text-lg">
                  Điểm tổng kết
                </div>
                <div className="font-semibold flex items-center">
                  <div className="mr-4">
                    Sinh viên {idGpaStudent[0]?.name_student}
                  </div>
                  <Button layout="outline" onClick={openModaladdGpa}>
                    Thêm học kỳ
                  </Button>
                </div>
              </div>
              <form>
                <Table
                  className="p-0"
                  key=""
                  dataSource={gpaStudent}
                  columns={columns}
                  pagination={{ pageSize: 5 }}
                />
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
    </>
  );
};

export default GpaStudentModal;
