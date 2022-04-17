import { createSelector } from "@reduxjs/toolkit";
// Selector University
export const getUniversitySelector = (state) => state.selectUniversity.university;
export const getSelectUniversitySelector = (state) => state.selectUniversity.select;

// Selector Auth
export const getTokenSelector = (state) => state.authLogin.isAuth;
export const getErrorAuthSelector = (state) => state.authLogin.error;
export const getUserAuthSelector = (state) => state.authLogin.user;

// Selector Faculty
export const getFacultySelector = (state) => state.faculty.faculty;
export const findFacultySelector = (state) => state.faculty.facultyRecord;
export const findIdFacultySelector = (state) => state.faculty.idFaculty;

// Notify Confirm Delete
export const notifyDeleteSelector = (state) => state.notifyDelete.isOpen;

