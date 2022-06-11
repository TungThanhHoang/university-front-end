import { createSelector } from "@reduxjs/toolkit";
// Selector University
export const getUniversitySelector = (state) =>
  state.selectUniversity.university;
export const findUniversitySelector = (state) =>
  state.selectUniversity.universityId;
export const getSelectUniversitySelector = (state) =>
  state.selectUniversity.select;
export const memberUniSelector = (state) =>
  state.selectUniversity.memberUniversity;

//
export const getMemUniversitySelector = (state) =>
  state.memberUniversity.memUniversity;
export const findMemUniversitySelector = (state) =>
  state.memberUniversity.memUniversityRecord;

// Selector University Main
export const findUniversityMainSelector = (state) =>
  state.selectUniversity.universityId;

// Selector Auth
export const getTokenSelector = (state) => state.authLogin.isAuth;
export const getErrorAuthSelector = (state) => state.authLogin.error;
export const getUserAuthSelector = (state) => state.authLogin.user;

// Selector Faculty
export const getFacultySelector = (state) => state.faculty.faculty;
export const findFacultySelector = (state) => state.faculty.facultyRecord;
export const findFacultyViewSelector = (state) =>
  state.faculty.facultyRecordView;
export const findIdFacultySelector = (state) => state.faculty.idFaculty;
export const findIdFacultyViewSelector = (state) => state.faculty.idFacultyView;

// Selector Position faculty

export const getPositionFacultySelector = (state) =>
  state.positionFaculty.positionFaculty;

// Selector Department
export const getDepartmentSelector = (state) => state.department.department;
export const findDepartmentSelector = (state) =>
  state.department.departmentRecord;
export const findIdDepartmentSelector = (state) =>
  state.department.idDepartment;

// Notify Confirm Delete
export const notifyDeleteSelector = (state) => state.notifyDelete.isOpen;

// Selector Job
export const getJobSelector = (state) => state.job.job;
export const findJobSelector = (state) => state.job.jobRecord;
export const findIdJobSelector = (state) => state.job.idJob;

// Selector Major
export const getMajorAllSelector = (state) => state.major.majorAll;
export const getMajorSelector = (state) => state.major.major;
export const findMajorSelector = (state) => state.major.majorRecord;
export const findIdMajorSelector = (state) => state.major.idMajor;

// Selector Subject
export const getSubjectSelector = (state) => state.subject.subject;
export const findSubjectSelector = (state) => state.subject.subjectRecord;
export const findIdSubjectSelector = (state) => state.subject.idSubject;

// Selector class
export const getClassSelector = (state) => state.class.class;
export const findClassSelector = (state) => state.class.classRecord;
export const findIdClassSelector = (state) => state.class.idClass;
export const findClassViewSelector = (state) => state.class.classRecordView;
export const findIdClassViewSelector = (state) => state.class.idClassView;
export const getGpaSelector = (state) => state.class.gpa;

//Selector Gpa

export const findGpaStudentViewSelector = (state) => state.class.gpaRecordView;
export const findIdGpaViewSelector = (state) => state.class.idGpaStudentView;

// Selector Academic
export const getAcademicSelector = (state) => state.academic.academic;
export const findAcademicSelector = (state) => state.academic.academicRecord;
export const findIdAcademicSelector = (state) => state.academic.idAcademic;

// Selector Employee
export const getEmployeeSelector = (state) => state.employee.employee;
export const findEmployeeSelector = (state) => state.employee.employeeRecord;
export const findIdEmployeeSelector = (state) => state.employee.idEmployee;
export const getEmployeePositionFacSelector = (state) =>
  state.employee.employeePositionFac;

// Selector Student
export const getStudentAllSelector = (state) => state.student.studentAll;
export const getStudentSelector = (state) => state.student.student;
export const getQRSelector = (state) => state.student.qrStudent;
export const findStudentSelector = (state) => state.student.studentRecord;
export const findIdStudentSelector = (state) => state.student.idStudent;
export const getStudentPositionFacSelector = (state) =>
  state.student.studentPositionFac;

// Main Uni

export const getDepSelector = (state) => state.mainSlice.department;
export const getFacSelector = (state) => state.mainSlice.faculty;
export const getSubSelector = (state) => state.mainSlice.subject;
export const getMaSelector = (state) => state.mainSlice.major;
export const getstuSelector = (state) => state.mainSlice.student;
export const getEmpSelector = (state) => state.mainSlice.employee;
