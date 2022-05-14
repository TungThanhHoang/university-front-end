import React from "react";

import PageTitle from "../Typography/PageTitle";
import { Input, HelperText, Label, Select, Textarea } from "@windmill/react-ui";

function FacultyFormAddEmp() {
  return (
    <>
      <div className="px-4 py-3 mb-8 ">
        <div className="flex justify-between flex-col sm:flex-row ">
          <Label className="mt-4 flex-1">
            <span>Tên nhân viên</span>
            <Select className="mt-1" multiple>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => {
                return (
                  <option className="text-base" key={index} value="">
                    Nguyễn quang hoàng vũ {index}
                  </option>
                );
              })}
            </Select>
          </Label>
          <Label className="mt-4 ml-2">
            <span>Chức vụ</span>
            <Select className="mt-1" >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => {
                return (
                  <option className="" key={index} value="">
                    Trưởng khoa {index}
                  </option>
                );
              })}
            </Select>
          </Label>
        </div>
      </div>
    </>
  );
}

export default FacultyFormAddEmp;
