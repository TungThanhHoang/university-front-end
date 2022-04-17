import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { ToastContainer, toast } from "react-toastify";
import facultySlice, { deleteFaculty } from "../pages/Faculty/facultySlice";
import notifyDeleteSlice from "../components/NotifyDelete/notifyDeleteSlice";
import NotifyDelete from "./NotifyDelete/NotifyDelete";
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
} from "@windmill/react-ui";
import { EditIcon, TrashIcon, ViewIcon } from "../icons/index";

function ActionTable({ openModalUpdate, id, openModalDelete }) {
  const dispatch = useDispatch();

  return (
    <>
      <TableCell id={id}>
        <div className="flex items-center space-x-4">
          <Button
            layout="link"
            size="icon"
            aria-label="Edit"
            onClick={() => openModalUpdate(id)}
          >
            <EditIcon className="w-5 h-5" aria-hidden="true" />
          </Button>
          <Button
            layout="link"
            size="icon"
            aria-label="Delete"
            onClick={() => openModalDelete(id)}
          >
            <TrashIcon className="w-5 h-5" aria-hidden="true" />
          </Button>
          <Button layout="link" size="icon" aria-label="View">
            <ViewIcon className="w-5 h-5" aria-hidden="true" />
          </Button>
        </div>
      </TableCell>
    </>
  );
}

export default ActionTable;
