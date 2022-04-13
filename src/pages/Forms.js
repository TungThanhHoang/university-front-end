import React from "react";

import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";
import { Input, HelperText, Label, Select, Textarea } from "@windmill/react-ui";

import { MailIcon } from "../icons";

function Forms() {
  return (
    <>
      <PageTitle>Forms</PageTitle>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Label>
          <span>Họ và tên</span>
          <Input className="mt-1" placeholder="Jane Doe" />
        </Label>

        <Label className="mt-4">
          <span>Mã sinh viên</span>
          <Input  className="mt-1" placeholder="Jane Doe" />
        </Label>

        <div className="mt-4">
          <Label>Giới tính</Label>
          <div className="mt-2">
            <Label radio>
              <Input type="radio" value="personal" name="accountType" />
              <span className="ml-2">Nam</span>
            </Label>
            <Label className="ml-6" radio>
              <Input type="radio" value="business" name="accountType" />
              <span className="ml-2">Nữ</span>
            </Label>
          </div>
        </div>

        <Label className="mt-4">
          <span>Requested Limit</span>
          <Select className="mt-1">
            <option>$1,000</option>
            <option>$5,000</option>
            <option>$10,000</option>
            <option>$25,000</option>
          </Select>
        </Label>

        <Label className="mt-4">
          <span>Multiselect</span>
          <Select className="mt-1" multiple>
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
            <option>Option 4</option>
            <option>Option 5</option>
          </Select>
        </Label>
      </div>
    </>
  );
}

export default Forms;
