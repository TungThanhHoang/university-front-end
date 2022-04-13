import axios from "axios";
import { API_URL } from "../constants";
export const loginAuth = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, formData);
    if (response.data.success === true) {
      localStorage.setItem("user_token", response.data.accessToken);
    }
    return response.data;
  } catch (error) {
    if (error.response.data) {
      console.log(error.response.data);
      return error.response.data;
    }
  }
};
export const registerAuth = async () => {
  try {
    return axios.get(`${API_URL}/auth/register`).then((res) => res.data);
  } catch (error) {
    console.log(error);
  }
};

export const getAuth = async () => {
  try {
    return axios.get(`${API_URL}/auth/me`).then((res) => res.data);
  } catch (error) {
    console.log(error);
  }
};
