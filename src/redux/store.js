import { configureStore } from '@reduxjs/toolkit'
import selectUniversitySlice from '../components/SelectUniversity/selectUniversitySlice'
import authLoginSlice from '../pages/Login/loginSlice'
import facultySlice from '../pages/Faculty/facultySlice'
import notifyDeleteSlice from '../components/NotifyDelete/notifyDeleteSlice'
const store = configureStore({
    reducer:{
        selectUniversity: selectUniversitySlice.reducer,
        authLogin: authLoginSlice.reducer,
        faculty: facultySlice.reducer,
        notifyDelete: notifyDeleteSlice.reducer
    }
})

export default store;
