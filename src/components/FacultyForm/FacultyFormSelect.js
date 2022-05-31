import React from "react";
import { TableCell, Select } from "@windmill/react-ui";
function FacultyFormSelect({
  handleOnchange,
  id_pos_fac,
  id_emp,
  positionFaculty,
  positionFacultyEmp,
}) {
  return (
    <>
      <TableCell>
        <Select
          className="mt-1"
          name="id_pos_fac"
          value={id_pos_fac}
          onChange={(e) => handleOnchange(e, id_emp)}
        >
          <option value="">--Không chọn--</option>
          {positionFaculty.map((pos, index) => (
            <option key={index} value={pos.id_pos_fac}>
              {pos.name_pos_fac}
            </option>
          ))}
        </Select>
      </TableCell>
    </>
  );
}

export default FacultyFormSelect;
