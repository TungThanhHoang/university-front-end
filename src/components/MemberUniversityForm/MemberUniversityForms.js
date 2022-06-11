import React from "react";

import PageTitle from "../Typography/PageTitle";
import SectionTitle from "../Typography/SectionTitle";
import { Input, HelperText, Label, Select, Textarea } from "@windmill/react-ui";

function MemberUniversityForms({ memUniForm, handleOnchange }) {
  const {
    name_vn_uni,
    name_en_uni,
    id_uni,
    phone_uni,
    address_uni,
    website_uni,
    img_uni,
  } = memUniForm;
  return (
    <>
      <PageTitle>Forms</PageTitle>
      <div className="px-4 py-3 mb-8 ">
        <div className="flex justify-between flex-col sm:flex-row">
          <Label className="mt-4">
            <span>Mã khoa</span>
            <Input
              className="mt-1"
              placeholder="Tên"
              name="id_uni"
              value={id_uni?.replace(/ +(?= )/g, "")}
              onChange={handleOnchange}
            />
          </Label>
          <Label className="mt-4">
            <span>Số điện thoại</span>
            <Input
              className="mt-1"
              placeholder="+84"
              name="phone_uni"
              value={phone_uni?.replace(/ +(?= )/g, "")}
              onChange={handleOnchange}
            />
          </Label>
        </div>
        <Label>
          <span>Tên đơn vị thành viên</span>
          <Input
            className="mt-1"
            placeholder="Khoa"
            name="name_vn_uni"
            value={name_vn_uni?.replace(/ +(?= )/g, "")}
            onChange={handleOnchange}
          />
        </Label>
        <Label>
          <span>Địa chỉ</span>
          <Input
            className="mt-1"
            placeholder="Khoa"
            name="address_uni"
            value={address_uni?.replace(/ +(?= )/g, "")}
            onChange={handleOnchange}
          />
        </Label>
        <Label>
          <span>Website</span>
          <Input
            className="mt-1"
            placeholder="Website"
            name="website_uni"
            value={website_uni?.replace(/ +(?= )/g, "")}
            onChange={handleOnchange}
          />
        </Label>
        <Label>
          <span className="capitalize">ảnh</span>
          <Input
            className="mt-1"
            placeholder="Khoa"
            name="img_uni"
            value={img_uni?.replace(/ +(?= )/g, "")}
            onChange={handleOnchange}
          />
        </Label>
      </div>
    </>
  );
}

export default MemberUniversityForms;
