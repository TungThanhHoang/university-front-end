import { configureStore } from '@reduxjs/toolkit'
import selectUniversitySlice from '../components/SelectUniversity/selectUniversitySlice'
import authLoginSlice from '../pages/Login/loginSlice'
import facultySlice from '../pages/Faculty/facultySlice'
import departmentSlice from '../pages/Department/departmentSlice'
import jobSlice from '../pages/Job/jobSlice'
import academicSlice from '../pages/Academic/academicSlice'
import employeeSlice from '../pages/Employee/employeeSlice'
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
        academic: academicSlice.reducer,
        employee: employeeSlice.reducer,
        memberUniversity: memUniversitySlice.reducer

    }
})

export default store;
