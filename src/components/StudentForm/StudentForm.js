import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import PageTitle from "../Typography/PageTitle";
import SectionTitle from "../Typography/SectionTitle";
import { Input, HelperText, Label, Select, Textarea } from "@windmill/react-ui";

function StudentForms({ studentForm, handleOnchange, classUni, disableId }) {
  const {
    id_student,
    name_student,
    gender_student,
    birthday_student,
    hometown_student,
    address_student,
    mobile_student,
    email_student,
    id_class,
  } = studentForm;

  const formatDate = (birthday) => {
    let data = new Date(birthday);
    return data.toLocaleDateString();
  };
  return (
    <>
      <PageTitle>Forms</PageTitle>
      <div className="grid gap-4 grid-cols-2 ">
        <Label className="mt-4 ">
          <span>Mã sinh viên</span>
          <Input
            className="mt-1"
            placeholder="Mã Code"
            name="id_student"
            value={id_student?.replace(/ +(?= )/g, "")}
            onChange={handleOnchange}
            disabled={disableId}
          />
        </Label>
        <Label className="mt-4">
          <span>Tên sinh viên</span>
          <Input
            className="mt-1"
            placeholder="Tên sinh viên"
            name="name_student"
            value={name_student?.replace(/ +(?= )/g, "")}
            onChange={handleOnchange}
          />
        </Label>
      </div>
      <div className="mt-4 grid gap-4 grid-cols-2">
        <div>
          <Label>Giới tính</Label>
          <div className="mt-2">
            <Label radio>
              <Input
                type="radio"
                value="Nam"
                name="gender_student"
                checked={gender_student?.trim().toLowerCase() === "nam"}
                onChange={handleOnchange}
              />
              <span className="ml-2">Nam</span>
            </Label>
            <Label className="ml-6" radio>
              <Input
                type="radio"
                value="Nữ"
                name="gender_student"
                checked={gender_student?.trim().toLowerCase() === "nữ"}
                onChange={handleOnchange}
              />
              <span className="ml-2">Nữ</span>
            </Label>
          </div>
        </div>
        <Label>
          <span>Ngày sinh</span>
          <Input
            className="mt-1"
            placeholder="1990/01/10"
            name="birthday_student"
            value={birthday_student ? formatDate(birthday_student?.replace(/ +(?= )/g, "")) : ""}
            onChange={handleOnchange}
          />
        </Label>
      </div>
      <div className="grid gap-4 grid-cols-2 ">
        <Label className="mt-4 ">
          <span>Quê Quán</span>
          <Input
            className="mt-1"
            placeholder="Quê quán"
            name="hometown_student"
            value={hometown_student?.replace(/ +(?= )/g, "")}
            onChange={handleOnchange}
          />
        </Label>
        <Label className="mt-4">
          <span>Địa chỉ thường trú</span>
          <Input
            className="mt-1"
            placeholder="Địa chỉ"
            name="address_student"
            value={address_student?.replace(/ +(?= )/g, "")}
            onChange={handleOnchange}
          />
        </Label>
      </div>
      <div className="grid gap-4 grid-cols-2 ">
        <Label className="mt-4 ">
          <span>Số điện thoại</span>
          <Input
            className="mt-1"
            placeholder="0326625627"
            name="mobile_student"
            value={mobile_student?.replace(/ +(?= )/g, "")}
            onChange={handleOnchange}
          />
        </Label>
        <Label className="mt-4">
          <span>Email</span>
          <Input
            className="mt-1"
            placeholder="abc@gmail.com"
            name="email_student"
            value={email_student?.replace(/ +(?= )/g, "")}
            onChange={handleOnchange}
          />
        </Label>
      </div>
      <Label className="mt-4">
        <span>Lớp</span>
        <Select
          className="mt-1"
          name="id_class"
          value={id_class?.trim()}
          onChange={handleOnchange}
        >
          <option value="">--Lớp--</option>
          {classUni?.map((item) => (
            <option key={item.id_class} value={item.id_class?.trim()}>
              {item.name_class}
            </option>
          ))}
        </Select>
      </Label>
    </>
  );
}

export default StudentForms;
