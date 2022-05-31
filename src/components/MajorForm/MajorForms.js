import React from "react";

import PageTitle from "../Typography/PageTitle";
import SectionTitle from "../Typography/SectionTitle";
import { Input, HelperText, Label, Select, Textarea } from "@windmill/react-ui";

function MajorForms({ majorForm, handleOnchange, faculty }) {
  const { name_major, id_fac } = majorForm;
  return (
    <>
      <PageTitle>Forms</PageTitle>
      <div className="px-4 py-3 mb-8 ">
        <Label>
          <span>Tên chuyên ngành</span>
          <Input
            className="mt-1"
            placeholder="Chuyên ngành"
            name="name_major"
            value={name_major?.replace(/ +(?= )/g, "")}
            onChange={handleOnchange}
          />
        </Label>
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

export default MajorForms;
