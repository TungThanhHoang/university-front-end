import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Select } from 'antd';
import {
  getFacultySelector,
  getMajorSelector,
  getDepartmentSelector,
  getEmployeeSelector,
  findUniversitySelector,
  getGpaSelector
} from "../../redux/selector";
import { getFaculty } from "../Faculty/facultySlice";
import { getEmployee } from "../Employee/employeeSlice";
import { getDepartment } from "../Department/departmentSlice";
import { getMajor } from "../Major/majorSlice";
import { getSubject } from "../Subject/subjectSlice";
import { getGpa } from "../Class/classSlice";
import { findUniversity } from "../../components/SelectUniversity/selectUniversitySlice";
import InfoCard from "../../components/Cards/InfoCard";
import ChartCard from "../../components/Chart/ChartCard";
import { Doughnut, Line } from "react-chartjs-2";
import ChartLegend from "../../components/Chart/ChartLegend";
import PageTitle from "../../components/Typography/PageTitle";
import { Badge } from '@windmill/react-ui'
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
import SelectView from "./SelectView";

const { Option } = Select;

function Dashboard() {
  const dispatch = useDispatch();
  const faculty = useSelector(getFacultySelector);
  const major = useSelector(getMajorSelector);
  const department = useSelector(getDepartmentSelector);
  const employee = useSelector(getEmployeeSelector);
  const university = useSelector(findUniversitySelector);
  const gpa = useSelector(getGpaSelector);
  const [groupItem, setGroupItem] = useState({ term: "" });
  // console.log("check", gpa && gpa[0]?.name_term);

  useEffect(() => {
    Promise.all([
      dispatch(getGpa()),
      dispatch(getFaculty()),
      dispatch(getDepartment()),
      dispatch(getEmployee()),
      dispatch(getMajor()),
      dispatch(getSubject()),
      dispatch(findUniversity()),
    ]);
  }, []);

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

  let arrMark = []
  let excellent = 0;
  let good = 0;
  let pass = 0;
  let avenger = 0;
  let fail = 0;

  let groupDataTest = gpa?.reduce(
    (acc, el) => {
      let term = el.name_term
      if (acc.hasOwnProperty(term)) acc[term].push(el);
      else acc[term] = [el];
      return acc
    }, {}
  )
  const filterData = gpa?.filter(item => item.name_term === groupItem.term);
  for (let item in filterData) {
    if (filterData[item].grade_gpa >= 8.5) {
      excellent++;
    } else if (filterData[item].grade_gpa >= 8) {
      good++;
    } else if (filterData[item].grade_gpa >= 7) {
      pass++
    } else if (filterData[item].grade_gpa >= 5) {
      avenger++
    } else {
      fail++
    }
  }
  arrMark.push(excellent, good, pass, avenger, fail);

  // console.log("sort", filterData?.sort((a, b) => b.grade_gpa - a.grade_gpa));


  const doughnutLegends = [
    { title: "Xuất sắc", color: "bg-green-400" },
    { title: "Giỏi", color: "bg-purple-400" },
    { title: "Khá", color: "bg-orange-400" },
    { title: "Trung bình", color: "bg-red-400" },
    { title: "Yếu, kém", color: "bg-blue-400" },
  ];



  const doughnutOptions = {
    data: {
      datasets: [
        {
          data: arrMark,
          backgroundColor: [
            "#31c48d",
            "#ac94fa",
            "#ff8a4c",
            "#f98080",
            "#76a9fa",
          ],
          label: "Dataset 1",
        },
      ],
      labels: ["Xuất sắc", "Giỏi", "Khá", "Trung bình", "Yếu"],
    },
    options: {
      responsive: true,
      cutoutPercentage: 80,
    },
    legend: {
      display: false,
    },
  };


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
            {university[0]?.name_vn_uni}
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

        <InfoCard title="Chuyên ngành" value={major.length}>
          <RoundIcon
            icon={SubjectIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>
      <PageTitle>Biểu đồ</PageTitle>
      <div className="flex items-center justify-between">
        <SelectView gpa={groupDataTest} groupItem={groupItem} setGroupItem={setGroupItem} />
        <p className="font-semibold text-lg "> Top Sinh Viên Đạt Điểm Cao  </p>
      </div>
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <div className="">
          {arrMark.reduce((a, b) => a + b, 0) !== 0 && <ChartCard title="Biểu đồ phần trăm" gpa={gpa}>
            <Doughnut {...doughnutOptions} />
            <ChartLegend legends={doughnutLegends} />
          </ChartCard>}
        </div>
        < div>
          {filterData?.sort((a, b) => b.grade_gpa - a.grade_gpa).slice(0, 5).map(item => <div key={item.id_student}>
            <div className="shadow-xs p-4 rounded-md mb-4 border-indigo-500 bg-white">
              <div className="flex items-center justify-between ">
                <div >
                  <div className="font-semibold capitalize text-base">{item.name_student}</div>
                  <div className="flex items-center">
                    <div className="text-gray-500">Lớp:</div>
                    <div className="ml-2 font-semibold">{item.id_class}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div>Điểm: </div>
                  <div className="ml-2"><Badge type={badgeGpa[sortGpa(item.grade_gpa)]}>{item.grade_gpa}</Badge></div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-gray-500">Chuyên ngành: </div>
                <div className="ml-2 font-semibold">{item.name_major}</div>
              </div>
            </div>
          </div>)}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
