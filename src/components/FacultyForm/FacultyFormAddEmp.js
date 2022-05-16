import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import employeeSlice, {
  getEmployeePositionFaculty,
} from "../../pages/Employee/employeeSlice";
import {
  findFacultyViewSelector,
  getPositionFacultySelector,
  getEmployeePositionFacSelector,
} from "../../redux/selector";
import PageTitle from "../Typography/PageTitle";
import { Input, HelperText, Label, Select, Textarea } from "@windmill/react-ui";

function FacultyFormAddEmp({ handleOnchange }) {
  const dispatch = useDispatch();
  const positionFaculty = useSelector(getPositionFacultySelector);
  const employeePositionFac = useSelector(getEmployeePositionFacSelector);
  const [formFaculty, setFormFaculty] = useState();
  const handleChangePosition = () => {
    setFormFaculty({ ...formFaculty });
  };
  console.log(positionFaculty);
  console.log(employeePositionFac);
  useEffect(() => {
    Promise.all([dispatch(getEmployeePositionFaculty())]);
  }, []);

  return (
    <>
      <div className="px-4 py-3 mb-8 ">
        <div className="flex justify-between flex-col sm:flex-row ">
          <Label className="mt-4 flex-1">
            <span>Tên nhân viên</span>
            <Select className="mt-1" name="id_emp" onChange={handleOnchange}>
              <option value="">--Chọn nhân viên</option>
              {employeePositionFac?.map((item, index) => {
                return (
                  <option
                    className="text-base"
                    key={item.id_emp}
                    value={item.id_emp}
                  >
                    {item.id_emp} - {item.name_emp} - {item.gender_emp} -{" "}
                    {item.name_academic} - {item.name_job} - {item.email_emp}
                  </option>
                );
              })}
            </Select>
          </Label>
          <Label className="mt-4 ml-2">
            <span>Chức vụ</span>
            <Select
              className="mt-1"
              name="id_pos_fac"
              onChange={handleOnchange}
            >
              <option value="">--Chọn chức vụ--</option>
              {positionFaculty?.map((pos) => (
                <option key={pos.id_pos_fac} value={pos.id_pos_fac}>
                  {pos.name_pos_fac}
                </option>
              ))}
            </Select>
          </Label>
        </div>
      </div>
    </>
  );
}

export default FacultyFormAddEmp;
