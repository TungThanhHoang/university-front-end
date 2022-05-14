import React, { useEffect } from "react";
import { Label, Select } from "@windmill/react-ui";
import { useDispatch, useSelector } from "react-redux";
import selectUniversitySlice, {
  fetchUniversities,
} from "./selectUniversitySlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { getUniversitySelector , getSelectUniversitySelector } from "../../redux/selector";

export default function SelectUniversity() {
  const dispatch = useDispatch();
  const university = useSelector(getUniversitySelector);
  const selectUniversity = useSelector(getSelectUniversitySelector);

  useEffect(() => {
    const fetchUniversity = async () => {
      const actionResult = await dispatch(fetchUniversities());
      const university = unwrapResult(actionResult);
      console.log(university);
    };
    fetchUniversity();
  }, []);
  const handleOnchangeSelect = (e) => {
    dispatch(selectUniversitySlice.actions.selectUniversity(e.target.value));
  };

  return (
    <Label>
      <span>Chọn trường </span>
      <Select className="mt-1" onChange={handleOnchangeSelect}  name="flag">
        <option value="">--Chọn trường--</option>
        {university?.map((item) => (
          <option className="capitalize" key={item.id_uni} value={item.id_uni}>{item.name_vn_uni}</option>
        ))}
      </Select>
    </Label>
  );
}
