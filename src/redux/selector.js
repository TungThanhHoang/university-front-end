import { createSelector } from "@reduxjs/toolkit";
// Selector University
export const getUniversitySelector = (state) => state.selectUniversity.university;
export const getSelectUniversitySelector = (state) => state.selectUniversity.select;

// Selector Auth

export const getTokenSelector = (state) => state.authLogin.isAuth;
export const getErrorAuthSelector = (state) => state.authLogin.error;
export const getUserAuthSelector = (state) => state.authLogin.user;