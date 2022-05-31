import React from "react";

import PageTitle from "../Typography/PageTitle";
import SectionTitle from "../Typography/SectionTitle";
import { Input, HelperText, Label, Select, Textarea } from "@windmill/react-ui";

function SubjectForms({ subjectForm, handleOnchange, faculty }) {
  const { name_subject, id_fac , credit_subject , code_subject } = subjectForm;
  return (
    <>
      <PageTitle>Forms</PageTitle>
      <div className="px-4 py-3 mb-8 ">
        <Label>
          <span>Tên môn học</span>
          <Input
            className="mt-1"
            placeholder="Môn học"
            name="name_subject"
            value={name_subject?.replace(/ +(?= )/g, "")}
            onChange={handleOnchange}
          />
        </Label>
        <div className="grid gap-4 grid-cols-2 ">
          <Label className="mt-4">
            <span>Mã môn học</span>
            <Input
              className="mt-1"
              placeholder="Mã môn học"
              name="code_subject"
              value={code_subject?.replace(/ +(?= )/g, "")}
              onChange={handleOnchange}
            />
          </Label>
          <Label className="mt-4 ">
            <span>Số tín chỉ</span>
            <Input
              className="mt-1"
              placeholder="Tín chỉ"
              name="credit_subject"
              value={credit_subject?.replace(/ +(?= )/g, "")}
              onChange={handleOnchange}
            />
          </Label>
        </div>
        <Label className="mt-4">
          <span>Tên công việc</span>
          <Select
            className="mt-1"
            name="id_fac"
            value={id_fac || ""}
            onChange={handleOnchange}
          >
            <option value="">--Khoa--</option>
            {faculty?.map((item) => (
              <option key={item.id_fac} value={item.id_fac}>
                {item.name_fac}
              </option>
            ))}
          </Select>
        </Label>
      </div>
    </>
  );
}

export default SubjectForms;
