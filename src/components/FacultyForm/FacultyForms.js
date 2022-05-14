import React from "react";

import PageTitle from "../Typography/PageTitle";
import SectionTitle from "../Typography/SectionTitle";
import { Input, HelperText, Label, Select, Textarea } from "@windmill/react-ui";


function FacultyForms({ facultyForm, handleOnchange  }) {
  const { name_fac, id_code, phone_fac, descipt_fac } = facultyForm;
  return (
    <>
      <PageTitle>Forms</PageTitle>
      <div className="px-4 py-3 mb-8 ">
        <Label>
          <span>Tên khoa</span>
          <Input
            className="mt-1"
            placeholder="Khoa"
            name="name_fac"
            value={name_fac?.replace(/ +(?= )/g,'')}
            onChange={handleOnchange}
          />
        </Label>

        <div className="flex justify-between flex-col sm:flex-row">
          <Label className="mt-4">
            <span>Mã khoa</span>
            <Input
              className="mt-1"
              placeholder="Code"
              name="id_code"
              value={id_code?.replace(/ +(?= )/g,'')}
              onChange={handleOnchange}
            />
          </Label>
          <Label className="mt-4">
            <span>Số điện thoại</span>
            <Input
              className="mt-1"
              placeholder="+84"
              name="phone_fac"
              value={phone_fac?.replace(/ +(?= )/g,'')}
              onChange={handleOnchange}
            />
          </Label>
        </div>
        <div className="mt-4">
          <Label>Miêu tả</Label>
          <div className="mt-2">
            <Textarea
              rows="3"
              placeholder="Miêu tả."
              name="descipt_fac"
              value={descipt_fac?.replace(/ +(?= )/g,'')}
              onChange={handleOnchange}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default FacultyForms;
