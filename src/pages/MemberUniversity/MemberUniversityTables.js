import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import memberUniversitySlice, {
  getMemUniversity,
  findMemUniversity,
} from "./memberUniversitySlice";
import notifyDeleteSlice from "../../components/NotifyDelete/notifyDeleteSlice";
import {
  getMemUniversitySelector,
  findMemUniversitySelector,
} from "../../redux/selector";
import PageTitle from "../../components/Typography/PageTitle";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Button,
  Pagination,
  Avatar
} from "@windmill/react-ui";

import response2 from "../../utils/demo/tableData";
import MemberUniversityModals from "../MemberUniversity/MemberUniversityModals";
import MemberUniversityUpdateModal from "../MemberUniversity/MemberUniversityUpdateModal";
import { unwrapResult } from "@reduxjs/toolkit";
import NotifyDelete from "../../components/NotifyDelete/NotifyDelete";
import ActionTable from "../../components/ActionTable";

function MemberUniversityTables() {
  const dispatch = useDispatch();
  const memUniversity = useSelector(getMemUniversitySelector);
  const memUniversityRecord = useSelector(findMemUniversitySelector);
  const response = memUniversity?.concat([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdate, setIsModalUpdate] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function closeModalUpdate() {
    setIsModalUpdate(false);
    dispatch(memberUniversitySlice.actions.clearState());
  }

  const [pageTable, setPageTable] = useState(1);

  const [dataTable, setDataTable] = useState([]);

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = response?.length;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await dispatch(getMemUniversity());
        const data = unwrapResult(results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setDataTable(
      response?.slice(
        (pageTable - 1) * resultsPerPage,
        pageTable * resultsPerPage
      )
    );
  }, [pageTable]);

  const onPageChangeTable = (p) => {
    setPageTable(p);
  };

  const openModalUpdate = async (id) => {
    try {
      const result = await dispatch(findMemUniversity(id.replace(/ /g, "")));
      const data = unwrapResult(result);
      // dispatch(facultySlice.actions.updateFacultyAction(id));
      console.log(data);
      if (data) {
        setIsModalUpdate(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (birthday) => {
    let data = new Date(birthday);
    return data.toLocaleDateString();
  };

  return (
    <>
      <ToastContainer />
      <PageTitle>
        <div className="flex justify-between">
          <div>Đơn vị thành viên</div>
          <Button onClick={openModal}>Thêm</Button>
        </div>
      </PageTitle>
      {/* <EmployeeModals isModalOpen={isModalOpen} closeModal={closeModal} /> */}
      {memUniversityRecord !== null && (
        <MemberUniversityUpdateModal
          isModalOpen={isModalUpdate}
          openModalUpdate={openModalUpdate}
          closeModal={closeModalUpdate}
        />
      )}

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>STT</TableCell>
              <TableCell>Đơn vị</TableCell>
              <TableCell>Địa chỉ</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Website</TableCell>
              <TableCell>Hành động</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {memUniversity?.map((item, i) => (
              <TableRow key={item.id_uni}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar
                      className="hidden mr-3 md:block"
                      src={item.img_uni}
                      alt=""
                    />
                    <div>
                      <p className="font-semibold">{item.name_vn_uni}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {item.id_uni}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className=" capitalize ">{item.address_uni}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className=" capitalize">{item.phone_uni}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="lowercase">{item.website_uni}</p>
                    </div>
                  </div>
                </TableCell>
                <ActionTable
                  openModalUpdate={openModalUpdate}
                  id={item.id_uni.replace(/ +(?= )/g, "")}
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
    </>
  );
}

export default MemberUniversityTables;
