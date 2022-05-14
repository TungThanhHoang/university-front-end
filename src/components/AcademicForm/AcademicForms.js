import React from "react";

import PageTitle from "../Typography/PageTitle";
import SectionTitle from "../Typography/SectionTitle";
import { Input, HelperText, Label, Select, Textarea } from "@windmill/react-ui";

function AcademicForms({ academicForm, handleOnchange }) {
  const { name_academic, code_academic } = academicForm;
  return (
    <>
      <PageTitle>Forms</PageTitle>
      <div className="px-4 py-3 mb-8 ">
        <Label>
          <span>Tên bằng cấp</span>
          <Input
            className="mt-1"
            placeholder="Bằng cấp"
            name="name_academic"
            value={name_academic?.replace(/ +(?= )/g, "")}
            onChange={handleOnchange}
          />
        </Label>
        <div className="flex justify-between flex-col sm:flex-row">
          <Label className="mt-4">
            <span>Mã bằng cấp</span>
            <Input
              className="mt-1"
              placeholder="Code"
              name="code_academic"
              value={code_academic?.replace(/ +(?= )/g, "")}
              onChange={handleOnchange}
            />
          </Label>
        </div>
      </div>
    </>
  );
}

export default AcademicForms;
