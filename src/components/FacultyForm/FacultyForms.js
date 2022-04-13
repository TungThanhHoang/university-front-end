import React from "react";

import PageTitle from "../Typography/PageTitle";
import SectionTitle from "../Typography/SectionTitle";
import { Input, HelperText, Label, Select, Textarea } from "@windmill/react-ui";

import { MailIcon } from "../../icons";

function FacultyForms() {
  return (
    <>
      <PageTitle>Forms</PageTitle>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Label>
          <span>Tên khoa</span>
          <Input className="mt-1" placeholder="Khoa" />
        </Label>

        <div className="flex justify-between flex-col sm:flex-row">
          <Label className="mt-4">
            <span>Mã khoa</span>
            <Input className="mt-1" placeholder="Code" />
          </Label>
          <Label className="mt-4">
            <span>Số điện thoại</span>
            <Input className="mt-1" placeholder="+84" />
          </Label>
        </div>
        <div className="mt-4">
          <Label>Miêu tả</Label>
          <div className="mt-2">
            <Textarea
              rows="3"
              placeholder="Miêu tả."
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default FacultyForms;
