import React from "react";

import PageTitle from "../Typography/PageTitle";
import SectionTitle from "../Typography/SectionTitle";
import { Input, HelperText, Label, Select, Textarea } from "@windmill/react-ui";

function GpaForms({ gpaForm, handleOnchange }) {
  const { name_term, grade_gpa } = gpaForm;
  return (
    <>
      <div className="px-4 py-3 mb-8 ">
        <Label>
          <span>Học kỳ</span>
          <Input
            className="mt-1"
            placeholder="Học kỳ 1, Năm 2020-2021"
            name="name_term"
            value={name_term}
            onChange={handleOnchange}
          />
        </Label>
        <Label className="mt-4 ">
          <span>Điểm thang 10</span>
          <Input
            className="mt-1"
            placeholder="Gpa"
            name="grade_gpa"
            value={grade_gpa}
            onChange={handleOnchange}
          />
        </Label>
      </div>
    </>
  );
}

export default GpaForms;
