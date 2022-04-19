import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import PageTitle from "../Typography/PageTitle";
import SectionTitle from "../Typography/SectionTitle";
import { Input, HelperText, Label, Select, Textarea } from "@windmill/react-ui";

function EmployeeForms({ employeeForm, handleOnchange , job , academic}) {
 

  const {
    id_emp,
    name_emp,
    gender_emp,
    birthday_emp,
    hometown_emp,
    address_emp,
    mobile_emp,
    email_emp,
    id_job,
    id_academic
  } = employeeForm;
  return (
    <>
      <PageTitle>Forms</PageTitle>
      <div className="grid gap-4 grid-cols-2 ">
        <Label className="mt-4 ">
          <span>Mã nhân Viên</span>
          <Input
            className="mt-1"
            placeholder="Mã Code"
            name="id_emp"
            value={id_emp?.replace(/ +(?= )/g, "")}
            onChange={handleOnchange}
          />
        </Label>
        <Label className="mt-4">
          <span>Tên nhân viên</span>
          <Input
            className="mt-1"
            placeholder="Tên nhân viên"
            name="name_emp"
            value={name_emp?.replace(/ +(?= )/g, "")}
            onChange={handleOnchange}
          />
        </Label>
      </div>
      <div className="mt-4 grid gap-4 grid-cols-2">
        <div>
          <Label>Giới tính</Label>
          <div className="mt-2">
            <Label radio>
              <Input type="radio" value="Nam" name="gender_emp" checked={gender_emp === 'Nam'} onChange={handleOnchange}/>
              <span className="ml-2">Nam</span>
            </Label>
            <Label className="ml-6" radio>
              <Input type="radio" value="Nữ" name="gender_emp" checked={gender_emp === 'Nữ'} onChange={handleOnchange}/>
              <span className="ml-2">Nữ</span>
            </Label>
          </div>
        </div>
        <Label>
          <span>Ngày sinh</span>
          <Input
            className="mt-1"
            placeholder="1990/01/10"
            name="birthday_emp"
            value={birthday_emp?.replace(/ +(?= )/g, "")}
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
            name="hometown_emp"
            value={hometown_emp?.replace(/ +(?= )/g, "")}
            onChange={handleOnchange}
          />
        </Label>
        <Label className="mt-4">
          <span>Địa chỉ thường trú</span>
          <Input
            className="mt-1"
            placeholder="Địa chỉ"
            name="address_emp"
            value={address_emp?.replace(/ +(?= )/g, "")}
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
            name="mobile_emp"
            value={mobile_emp?.replace(/ +(?= )/g, "")}
            onChange={handleOnchange}
          />
        </Label>
        <Label className="mt-4">
          <span>Email</span>
          <Input
            className="mt-1"
            placeholder="abc@gmail.com"
            name="email_emp"
            value={email_emp?.replace(/ +(?= )/g, "")}
            onChange={handleOnchange}
          />
        </Label>
      </div>
      <div className="grid gap-4 grid-cols-2 ">
        <Label className="mt-4">
          <span>Tên công việc</span>
          <Select className="mt-1" name="id_job" value={id_job}  onChange={handleOnchange}>
            <option value="">--Công việc--</option>
            {job?.map((item) => (
              <option key={item.id_job} value={item.id_job}>
                {item.name_job}
              </option>
            ))}
          </Select>
        </Label>
        <Label className="mt-4">
          <span>Bằng cấp</span>
          <Select className="mt-1" name="id_academic" value={id_academic}  onChange={handleOnchange}>
            <option value="">--Bằng cấp--</option>
            {academic?.map((item) => (
              <option key={item.id_academic} value={item.id_academic}>
                {item.name_academic}
              </option>
            ))}
          </Select>
        </Label>
      </div>
    </>
  );
}

export default EmployeeForms;
