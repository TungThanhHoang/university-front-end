import React, { useState, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import Lottie from "react-lottie";

import { ToastContainer, toast } from "react-toastify";
import SelectUniversity from "../../components/SelectUniversity/SelectUniversity";
import ImageLight from "../../assets/svg/login-light.json";
import ImageDark from "../../assets/img/login-office-dark.jpeg";
import { GithubIcon, TwitterIcon } from "../../icons";
import { Label, Input, Button } from "@windmill/react-ui";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAuth } from "../../pages/Login/loginSlice.js";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  getSelectUniversitySelector,
  getTokenSelector,
  getErrorAuthSelector,
} from "../../redux/selector";

function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const getSelectUniver = useSelector(getSelectUniversitySelector);
  const getAuth = useSelector(getTokenSelector);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    flag: "",
  });
  const { email, password } = loginForm;
  useEffect(() => {
    setLoginForm({
      ...loginForm,
      flag: getSelectUniver.replace(/ /g, ""),
    });
  }, [getSelectUniver]);

  const handleOnchange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
      flag: getSelectUniver.replace(/ /g, ""),
    });
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: ImageLight,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "" || getSelectUniver === "")
      return toast.error("Hãy nhập đầy đủ thông tin!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    try {
      const actionResult = await dispatch(loginUserAuth(loginForm));
      const { data } = unwrapResult(actionResult);
      history.push("/app/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(`${error.msg}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  if (getAuth) return <Redirect to="/app/dashboard" />;
  else
    return (
      <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
          <div className="flex flex-col overflow-y-auto md:flex-row">
            <div className="h-32 md:h-auto md:w-1/2">
              <div className="w-full h-full dark:hidden hidden md:block ">
                <Lottie options={defaultOptions} height={400} width={400} />
              </div>
              <img
                aria-hidden="true"
                className="  md:hidden object-cover w-full h-full dark:hidden "
                src={ImageDark}
                alt="Office"
              />
              <img
                aria-hidden="true"
                className="hidden object-cover w-full h-full dark:block"
                src={ImageDark}
                alt="Office"
              />
            </div>
            <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
              <div className="w-full">
                <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                  Đăng Nhập
                </h1>
                <ToastContainer />
                <form onSubmit={handleOnSubmit}>
                  <SelectUniversity />
                  <Label className="mt-4">
                    <span>Email</span>
                    <Input
                      className="mt-1"
                      type="email"
                      placeholder="abc@gmail.com"
                      name="email"
                      onChange={handleOnchange}
                      value={email}
                    />
                  </Label>

                  <Label className="mt-4">
                    <span>Mật khẩu</span>
                    <Input
                      className="mt-1"
                      type="password"
                      placeholder="***************"
                      name="password"
                      onChange={handleOnchange}
                      value={password}
                    />
                  </Label>

                  <Button type="submit" className="mt-4" block>
                    Log in
                  </Button>
                  <hr className="my-8" />
                  <Button block layout="outline">
                    <GithubIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                    Google
                  </Button>
                  <Button className="mt-4" block layout="outline">
                    <TwitterIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                    Facebook
                  </Button>

                  <p className="mt-4">
                    <Link
                      className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                      to="/login-admin"
                    >
                      Đăng nhập với Đại học Đà Nẵng?
                    </Link>
                  </p>
                </form>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
}

export default Login;
