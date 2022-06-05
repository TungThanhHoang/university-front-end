import React, { useEffect } from "react";
import { Tabs } from "antd";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  CardBody,
} from "@windmill/react-ui";
import InfoCard from "../../components/Cards/InfoCard";
import PageTitle from "../../components/Typography/PageTitle";
import {
  LocaleIcon,
  PeopleIcon,
  CardsIcon,
  ChartsIcon,
  PhoneIcon,
  WebIcon,
} from "../../icons";
import RoundIcon from "../../components/RoundIcon";

import {
  getFaculty,
  getStudent,
  getDepartment,
  getMajor,
  getSubject,
  getEmployee,
} from "../DetailUniversity/mainSlice";

import { getEmpSelector, getstuSelector, getMaSelector, getSubSelector, getDepSelector, getFacSelector } from '../../redux/selector'
import {
  Avatar,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  // Button,
  Pagination,
} from "@windmill/react-ui";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
const { TabPane } = Tabs;
export default function DetailUniversityModal({
  isModalOpen,
  handleOpenModal,
  handleCloseModal,
  id,
  memberUni
}) {
  const dispatch = useDispatch();
  const faculty = useSelector(getFacSelector)
  const department = useSelector(getDepSelector)
  const major = useSelector(getMaSelector)
  const subject = useSelector(getSubSelector)
  const student = useSelector(getstuSelector)
  const employee = useSelector(getEmpSelector)
  useEffect(() => {
    
    Promise.all([
      dispatch(getFaculty(id)),
      dispatch(getDepartment(id)),
      dispatch(getMajor(id)),
      dispatch(getSubject(id)),
      dispatch(getStudent(id)),
      dispatch(getEmployee(id)),
    ]);
  }, []);

  const formatDate = (birthday) => {
    let data = new Date(birthday);
    return data.toLocaleDateString();
  };

  const columnEmployee = [
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
    }
  ];

  // 

  const columnMajor = [
    {
      title: "STT",
      key: "stt",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Chuyên ngành",
      dataIndex: "name_major",
      key: "name_major",
    },
    {
      title: "Khoa",
      dataIndex: "name_fac",
      key: "name_fac",
    }
  ];
  //  
  const columnSubject = [
    {
      title: "STT",
      key: "stt",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Chuyên ngành",
      dataIndex: "name_subject",
      key: "name_major",
      render: (_, item) => {
        return (
          <>
            <p className="font-semibold ">{item.name_subject}</p>
            <p className="text-xs">{item.code_subject}</p>
          </>
        );
      },
    },
    {
      title: "Tín chỉ",
      dataIndex: "credit_subject",
      key: "credit_subject",
    },
    {
      title: "Khoa",
      dataIndex: "name_fac",
      key: "name_fac",
    },
  ];
  // 

  const columnStudent = [
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
            <p className=" ">{item.name_class}</p>
          </>
        );
      },
    },
    {
      title: "Chuyên ngành",
      dataIndex: "name_major",
      key: "name_major",
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
    }
  ];
  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 z-40 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center appear-done enter-done">
          <div className="w-full px-6 py-4 overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-5xl appear-done enter-done">
            <div>
              <ModalBody>
                <div className="flex justify-between mb-5">
                  <div className="capitalize font-semibold text-lg">
                    {memberUni[0]?.name_vn_uni}
                    {/* Trường Đại Học Việt Hàn */}
                  </div>
                </div>
                <Tabs defaultActiveKey="1">
                  <TabPane tab="Thống kê" key="1">
                    <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4 ">
                      <InfoCard title="Khoa" value={faculty.length}>
                        <RoundIcon
                          icon={CardsIcon}
                          iconColorClass="text-orange-500 dark:text-orange-100"
                          bgColorClass="bg-orange-100 dark:bg-orange-500"
                          className="mr-4"
                        />
                      </InfoCard>

                      <InfoCard title="Phòng ban" value={department.length}>
                        <RoundIcon
                          icon={ChartsIcon}
                          iconColorClass="text-green-500 dark:text-green-100"
                          bgColorClass="bg-green-100 dark:bg-green-500"
                          className="mr-4"
                        />
                      </InfoCard>

                      <InfoCard title="Chuyên ngành" value={major.length}>
                        <RoundIcon
                          icon={PeopleIcon}
                          iconColorClass="text-blue-500 dark:text-blue-100"
                          bgColorClass="bg-blue-100 dark:bg-blue-500"
                          className="mr-4"
                        />
                      </InfoCard>
                      <InfoCard title="Sinh viên" value={student.length}>
                        <RoundIcon
                          icon={PeopleIcon}
                          iconColorClass="text-blue-500 dark:text-blue-100"
                          bgColorClass="bg-blue-100 dark:bg-blue-500"
                          className="mr-4"
                        />
                      </InfoCard>
                    </div>
                  </TabPane>
                  <TabPane tab="Cán bộ" key="2">
                    <Table
                      className="p-0 dark:bg-gray-80"
                      keyRow="id"
                      dataSource={employee}
                      columns={columnEmployee}
                      pagination={{ pageSize: 4 }}
                    />
                  </TabPane>
                  <TabPane tab="Chuyên ngành" key="3">
                    <Table
                      className="p-0 dark:bg-gray-80"
                      keyRow="id"
                      dataSource={major}
                      columns={columnMajor}
                      pagination={{ pageSize: 4 }}
                    />
                  </TabPane>
                  <TabPane tab="Môn học" key="4">
                    <Table
                      className="p-0 dark:bg-gray-80"
                      keyRow="id"
                      dataSource={subject}
                      columns={columnSubject}
                      pagination={{ pageSize: 4 }}
                    />
                  </TabPane>
                  <TabPane tab="Sinh viên" key="5">
                    <Table
                      className="p-0 dark:bg-gray-80"
                      keyRow="id"
                      dataSource={student}
                      columns={columnStudent}
                      pagination={{ pageSize: 4 }}
                    />
                  </TabPane>
                </Tabs>
              </ModalBody>
              <ModalFooter>
                <div className="hidden sm:block">
                  <Button onClick={handleCloseModal}>Hủy bỏ</Button>
                </div>
                <div className="block w-full sm:hidden">
                  <Button block size="large" onClick={handleCloseModal}>
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
