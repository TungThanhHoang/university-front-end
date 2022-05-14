import React from "react";

import PageTitle from "../Typography/PageTitle";
import SectionTitle from "../Typography/SectionTitle";
import { Input, HelperText, Label, Select, Textarea } from "@windmill/react-ui";


function JobForms({ jobForm, handleOnchange  }) {
  const { name_job } = jobForm;
  return (
    <>
      <PageTitle>Forms</PageTitle>
      <div className="px-4 py-3 mb-8 ">
        <Label>
          <span>Tên công việc</span>
          <Input
            className="mt-1"
            placeholder="Khoa"
            name="name_job"
            value={name_job?.replace(/ +(?= )/g,'')}
            onChange={handleOnchange}
          />
        </Label>
      </div>
    </>
  );
}

export default JobForms;
