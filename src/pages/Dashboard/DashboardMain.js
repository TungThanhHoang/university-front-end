import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getEmployeeSelector,
  getUniversitySelector,
  findUniversityMainSelector,
} from "../../redux/selector";
import { getEmployee } from "../Employee/employeeSlice";
import {
  findUniversityMain,
  fetchUniversities,
} from "../../components/SelectUniversity/selectUniversitySlice";
import InfoCard from "../../components/Cards/InfoCard";
import PageTitle from "../../components/Typography/PageTitle";
import { Card, CardBody } from "@windmill/react-ui";
import {
  LocaleIcon,
  PeopleIcon,
  CardsIcon,
  ChartsIcon,
  PhoneIcon,
  WebIcon,
} from "../../icons";
import RoundIcon from "../../components/RoundIcon";

function Dashboard() {
  const dispatch = useDispatch();
  const employee = useSelector(getEmployeeSelector);
  const universityMain = useSelector(findUniversityMainSelector);
  const university = useSelector(getUniversitySelector);
  useEffect(() => {
    Promise.all([
      dispatch(getEmployee()),
      dispatch(findUniversityMain(), dispatch(fetchUniversities())),
    ]);
  }, []);

  return (
    <>
      <div className="mt-10 flex items-center">
        <img className="object-cover w-16 h-16" src={universityMain[0]?.img_main} alt="" />
        <div className="font-bold text-2xl ml-4 text-blue-900 uppercase">
          {universityMain[0]?.name_main}
        </div>
      </div>

      <PageTitle>Thống kê</PageTitle>

      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Trường đại học thành viên" value={university.length}>
          <RoundIcon
            icon={CardsIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Chuyên ngành đào tạo" value="263">
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

        <InfoCard title="Phòng ban" value="35">
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>
      <PageTitle>Các đơn vị thành viên trực thuộc</PageTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 col-gap-6">
        {university?.map((item) => {
          return (
            <Card colored className="bg-white dark:bg-gray-800 mb-4 flex items-center">
              <img className="object-cover w-20 h-20 ml-4" src={item.img_uni} alt="" />
              <CardBody>
                <p className="mb-2 font-semibold text-base capitalize dark:text-white">
                  {item.name_vn_uni}
                </p>
                <p className="capitalize text-sm flex items-center text-gray-500 dark:text-white">
                  <LocaleIcon />
                  <span className="flex-1 ml-2">{item.address_uni}</span>
                </p>
                <div className="flex mt-2">
                  <p className="flex items-center text-gray-500 dark:text-white">
                    <PhoneIcon />
                    <span className="text-sm ml-2">{item.phone_uni}</span>
                  </p>
                  <p className="flex items-center ml-4 text-gray-500 dark:text-white">
                    <WebIcon />
                    <span className="text-sm ml-2">{item.website_uni}</span>
                  </p>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </>
  );
}

export default Dashboard;
