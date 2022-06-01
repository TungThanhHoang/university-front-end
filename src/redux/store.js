import { configureStore } from '@reduxjs/toolkit'
import selectUniversitySlice from '../components/SelectUniversity/selectUniversitySlice'
import authLoginSlice from '../pages/Login/loginSlice'
import facultySlice from '../pages/Faculty/facultySlice'
import positionFacultySlice from '../pages/Faculty/positionFacultySlice'
import departmentSlice from '../pages/Department/departmentSlice'
import jobSlice from '../pages/Job/jobSlice'
import majorSlice from '../pages/Major/majorSlice'
import subjectSlice from '../pages/Subject/subjectSlice'
import classSlice from '../pages/Class/classSlice'
import academicSlice from '../pages/Academic/academicSlice'
import employeeSlice from '../pages/Employee/employeeSlice'
import studentSlice from '../pages/Student/studentSlice'
import memUniversitySlice from '../pages/MemberUniversity/memberUniversitySlice'
import notifyDeleteSlice from '../components/NotifyDelete/notifyDeleteSlice'
const store = configureStore({
    reducer:{
        selectUniversity: selectUniversitySlice.reducer,
        authLogin: authLoginSlice.reducer,
        faculty: facultySlice.reducer,
        department: departmentSlice.reducer,
        notifyDelete: notifyDeleteSlice.reducer,
        job: jobSlice.reducer,
        major: majorSlice.reducer,
        class: classSlice.reducer,
        subject: subjectSlice.reducer,
        academic: academicSlice.reducer,
        employee: employeeSlice.reducer,
        student: studentSlice.reducer,
        memberUniversity: memUniversitySlice.reducer,
        positionFaculty: positionFacultySlice.reducer,


    }
})

export default store;
