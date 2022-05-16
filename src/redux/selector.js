import { createSelector } from "@reduxjs/toolkit";
// Selector University
export const getUniversitySelector = (state) => state.selectUniversity.university;
export const findUniversitySelector = (state) => state.selectUniversity.universityId;
export const getSelectUniversitySelector = (state) => state.selectUniversity.select;

// 
export const getMemUniversitySelector = (state) => state.memberUniversity.memUniversity;
export const findMemUniversitySelector = (state) => state.memberUniversity.memUniversityRecord;

// Selector University Main
export const findUniversityMainSelector = (state) => state.selectUniversity.universityId;

// Selector Auth
export const getTokenSelector = (state) => state.authLogin.isAuth;
export const getErrorAuthSelector = (state) => state.authLogin.error;
export const getUserAuthSelector = (state) => state.authLogin.user;

// Selector Faculty
export const getFacultySelector = (state) => state.faculty.faculty;
export const findFacultySelector = (state) => state.faculty.facultyRecord;
export const findFacultyViewSelector = (state) => state.faculty.facultyRecordView;
export const findIdFacultySelector = (state) => state.faculty.idFaculty;

// Selector Position faculty

export const getPositionFacultySelector = (state) => state.positionFaculty.positionFaculty;

// Selector Department
export const getDepartmentSelector = (state) => state.department.department;
export const findDepartmentSelector = (state) => state.department.departmentRecord;
export const findIdDepartmentSelector = (state) => state.department.idDepartment;

// Notify Confirm Delete
export const notifyDeleteSelector = (state) => state.notifyDelete.isOpen;

// Selector Job
export const getJobSelector = (state) => state.job.job;
export const findJobSelector = (state) => state.job.jobRecord;
export const findIdJobSelector = (state) => state.job.idJob;

// Selector Academic
export const getAcademicSelector = (state) => state.academic.academic;
export const findAcademicSelector = (state) => state.academic.academicRecord;
export const findIdAcademicSelector = (state) => state.academic.idAcademic;

// Selector Employee
export const getEmployeeSelector = (state) => state.employee.employee;
export const findEmployeeSelector = (state) => state.employee.employeeRecord;
export const findIdEmployeeSelector = (state) => state.employee.idEmployee;
export const getEmployeePositionFacSelector = (state) => state.employee.employeePositionFac;
