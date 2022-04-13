import { configureStore } from '@reduxjs/toolkit'
import selectUniversitySlice from '../components/SelectUniversity/selectUniversitySlice'
import authLoginSlice from '../pages/Login/loginSlice'
const store = configureStore({
    reducer:{
        selectUniversity: selectUniversitySlice.reducer,
        authLogin: authLoginSlice.reducer,
    }
})

export default store;
