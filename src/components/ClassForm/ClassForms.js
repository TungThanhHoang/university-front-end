import React from "react";

import PageTitle from "../Typography/PageTitle";
import SectionTitle from "../Typography/SectionTitle";
import { Input, HelperText, Label, Select, Textarea } from "@windmill/react-ui";

function ClassForms({ classForm, handleOnchange, major }) {
  const { name_class, id_major, id_class, course } = classForm;
  return (
    <>
      <PageTitle>Forms</PageTitle>
      <div className="px-4 py-3 mb-8 ">
        <Label>
          <span>Tên lớp</span>
          <Input
            className="mt-1"
            placeholder="Lớp"
            name="name_class"
            value={name_class?.replace(/ +(?= )/g, "")}
            onChange={handleOnchange}
          />
        </Label>
        <div className="grid gap-4 grid-cols-2 ">
          <Label className="mt-4">
            <span>Mã lớp</span>
            <Input
              className="mt-1"
              placeholder="Mã lớp"
              name="id_class"
              value={id_class?.replace(/ +(?= )/g, "")}
              onChange={handleOnchange}
            />
          </Label>
          <Label className="mt-4 ">
            <span>Khóa</span>
            <Input
              className="mt-1"
              placeholder="Khóa học"
              name="course"
              value={course?.replace(/ +(?= )/g, "")}
              onChange={handleOnchange}
            />
          </Label>
        </div>
        <Label className="mt-4">
          <span>Tên chuyên ngành</span>
          <Select
            className="mt-1"
            name="id_major"
            value={id_major}
            onChange={handleOnchange}
          >
            <option value="">--Chuyên ngành--</option>
            {major?.map((item) => (
              <option key={item.id_major} value={item.id_major}>
                {item.name_major}
              </option>
            ))}
          </Select>
        </Label>
      </div>
    </>
  );
}

export default ClassForms;
