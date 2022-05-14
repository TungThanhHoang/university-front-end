import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getFacultySelector,
  getDepartmentSelector,
  getEmployeeSelector,
  findUniversitySelector,
} from "../../redux/selector";
import { getFaculty } from "../Faculty/facultySlice";
import { getEmployee } from "../Employee/employeeSlice";
import { getDepartment } from "../Department/departmentSlice";
import { findUniversity } from "../../components/SelectUniversity/selectUniversitySlice";
import InfoCard from "../../components/Cards/InfoCard";
import ChartCard from "../../components/Chart/ChartCard";
import { Doughnut, Line } from "react-chartjs-2";
import ChartLegend from "../../components/Chart/ChartLegend";
import PageTitle from "../../components/Typography/PageTitle";
import {
  ChatIcon,
  CartIcon,
  MoneyIcon,
  PeopleIcon,
  CardsIcon,
  ChartsIcon,
  SubjectIcon,
} from "../../icons";
import RoundIcon from "../../components/RoundIcon";

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from "../../utils/demo/chartsData";

function Dashboard() {
  const dispatch = useDispatch();
  const faculty = useSelector(getFacultySelector);
  const department = useSelector(getDepartmentSelector);
  const employee = useSelector(getEmployeeSelector);
  const university = useSelector(findUniversitySelector);

  useEffect(() => {
    Promise.all([
      dispatch(getFaculty()),
      dispatch(getDepartment()),
      dispatch(getEmployee()),
      dispatch(findUniversity()),
    ]);
  }, []);

  return (
    <>
      <div className="mt-10 flex items-center">
        <img
          className="object-cover w-16 h-16"
          src={university[0]?.img_uni}
          alt=""
        />
        <div className="ml-4">
          <div className="font-bold text-2xl  text-blue-900 uppercase">
            ĐẠI HỌC ĐÀ NẴNG
          </div>
          <div className="capitalize font-bold text-lg">
            Trường {university[0]?.name_vn_uni}
          </div>
        </div>
      </div>

      <PageTitle>Thống kê</PageTitle>

      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
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

        <InfoCard title="Cán bộ giảng viên" value={employee.length}>
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Chuyên ngành" value="35">
          <RoundIcon
            icon={SubjectIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>
      <PageTitle>Biểu đồ</PageTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="Biểu đồ phần trăm">
          <Doughnut {...doughnutOptions} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>

      </div>
    </>
  );
}

export default Dashboard;
